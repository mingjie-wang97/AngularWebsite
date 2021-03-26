import { ToTheMaxComponent } from "../projects/to-the-max/to-the-max.component";

export class Quad {
    public x;
    public y;
    public w;
    public h;
    public color;
    public score;

    constructor(x, y, w, h) {
        const [r, g, b, error] = this.colorFromHistogram(this.computeHistogram(x, y, w, h));
        this.x = x, this.y = y, this.w = w, this.h = h;
        this.color = `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).substring(1)}`;
        this.score = error * Math.pow(w * h, 0.25);
    }

    split() {
        const dx = this.w / 2, x1 = this.x, x2 = this.x + dx;
        const dy = this.h / 2, y1 = this.y, y2 = this.y + dy;
        return [
            new Quad(x1, y1, dx, dy),
            new Quad(x2, y1, dx, dy),
            new Quad(x1, y2, dx, dy),
            new Quad(x2, y2, dx, dy)
        ];
    }

    colorFromHistogram(histogram) {
        const [r, re] = this.weightedAverage(histogram.subarray(0, 256));
        const [g, ge] = this.weightedAverage(histogram.subarray(256, 512));
        const [b, be] = this.weightedAverage(histogram.subarray(512, 768));
        return [
            Math.round(r),
            Math.round(g),
            Math.round(b),
            re * 0.2989 + ge * 0.5870 + be * 0.1140
        ];
    }

    weightedAverage(histogram) {
        let total = 0;
        let value = 0;
        for (let i = 0; i < 256; ++i) total += histogram[i], value += histogram[i] * i;
        value /= total;
        let error = 0;
        for (let i = 0; i < 256; ++i) error += (value - i) ** 2 * histogram[i];
        return [value, Math.sqrt(error / total)];
    }

    computeHistogram(x, y, w, h) {

        const { data } = this.ctx.getImageData(x, y, w, h);
        const histogram = new Uint32Array(1024);
        for (let i = 0, n = data.length; i < n; i += 4) {
            ++histogram[0 * 256 + data[i + 0]];
            ++histogram[1 * 256 + data[i + 1]];
            ++histogram[2 * 256 + data[i + 2]];
            ++histogram[3 * 256 + data[i + 3]];
        }
        return histogram;
    }

    imageContext = FileAttachment("owl.jpg").image().then(image => {
        const context = DOM.context2d(width, width, 1);
        console.log(context);
        context.drawImage(image, 0, 0, width, width);
        return context;
    })
}