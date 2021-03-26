import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";
import TinyQueue from "tinyqueue";

@Component({
  selector: 'app-to-the-max',
  templateUrl: './to-the-max.component.html',
  styleUrls: ['./to-the-max.component.scss']
})
export class ToTheMaxComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  public ctx: CanvasRenderingContext2D;
  private canvasImageData;
  private vis;

  private imageURL = "../../../assets/img/tothemax/kitten.jpg";
  private imageObject: HTMLImageElement;

  // basic dimesions
  private width: number = 1024;
  public area_power: number = 0.25;

  // image matrix
  private histogram = new Uint32Array(1024);
  // graph object
  private graph;


  static Quad = class {
    public x;
    public y;
    public w;
    public h;
    public color;
    public score;
    private ctx;
    private imageObject;

    constructor(x, y, w, h) {
      console.log("constructor");
      this.createImage(x, y, w, h);
    }

    initFunction(x, y, w, h) {
      const [r, g, b, error] = this.colorFromHistogram(this.computeHistogram(x, y, w, h));
      console.log("constructor check2");
      this.x = x, this.y = y, this.w = w, this.h = h;
      this.color = `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).substring(1)}`;
      this.score = error * Math.pow(w * h, 0.25);
    }

    split() {
      const dx = this.w / 2, x1 = this.x, x2 = this.x + dx;
      const dy = this.h / 2, y1 = this.y, y2 = this.y + dy;
      return [
        new ToTheMaxComponent.Quad(x1, y1, dx, dy),
        new ToTheMaxComponent.Quad(x2, y1, dx, dy),
        new ToTheMaxComponent.Quad(x1, y2, dx, dy),
        new ToTheMaxComponent.Quad(x2, y2, dx, dy)
      ];
    }

    colorFromHistogram(histogram) {
      const [r, re] = this.weightedAverage(histogram.subarray(0, 256));
      const [g, ge] = this.weightedAverage(histogram.subarray(256, 512));
      const [b, be] = this.weightedAverage(histogram.subarray(512, 768));
      console.log("colorFromHistogram");
      return [
        Math.round(r),
        Math.round(g),
        Math.round(b),
        re * 0.2989 + ge * 0.5870 + be * 0.1140
      ];
    }

    weightedAverage(histogram) {
      console.log("weightedAverage");
      let total = 0;
      let value = 0;
      for (let i = 0; i < 256; ++i) total += histogram[i], value += histogram[i] * i;
      value /= total;
      let error = 0;
      for (let i = 0; i < 256; ++i) error += (value - i) ** 2 * histogram[i];
      return [value, Math.sqrt(error / total)];
    }


    createImage(x, y, w, h) {
      this.imageObject = new Image();
      this.imageObject.src = "../../../assets/img/tothemax/kitten.jpg";

      // canvas will only display the image data after it has been loaded
      // return an image data on this canvas
      this.imageObject.onload = () => {
        try {
          this.ctx = (<HTMLCanvasElement>document.getElementById("canvas")).getContext('2d');
          this.ctx.drawImage(this.imageObject, 0, 0, 1024, 1024);
          this.initFunction(x, y, w, h);
        } catch (error) {
          console.error("When loading the image inside quad, this happens: " + error);
        }
      }
    }

    computeHistogram(x, y, w, h) {
      console.log("computeHistogram01234");
      const { data } = this.ctx.getImageData(x, y, w, h);
      const histogram = new Uint32Array(1024);
      for (let i = 0, n = data.length; i < n; i += 4) {
        ++histogram[0 * 256 + data[i + 0]];
        ++histogram[1 * 256 + data[i + 1]];
        ++histogram[2 * 256 + data[i + 2]];
        ++histogram[3 * 256 + data[i + 3]];
      }
      console.log("computeHistogram");
      return histogram;
    }
  }
  static ctx: any;

  constructor() {
    this.canvasImageData = this.createImage();
  }

  ngOnInit(): void {
  }

  createImage() {
    this.imageObject = new Image();
    this.imageObject.src = this.imageURL;
    this.imageObject.alt = "myToTheMaxImage";

    // canvas will only display the image data after it has been loaded
    // return an image data on this canvas
    this.imageObject.onload = () => {
      return this.loadImage();
    }
  }

  loadImage() {
    try {
      this.ctx = this.canvas?.nativeElement.getContext('2d');
      this.ctx.drawImage(this.imageObject, 0, 0, this.width, this.width);
      this.graph = this.startCircle();
    } catch (error) {
      console.error("When loading the image, this happens: " + error);
    }
  }

  startCircle() {
    console.log("test");
    let width = this.width;
    let quads = new TinyQueue([new ToTheMaxComponent.Quad(0, 0, width, width)], (a, b) => b.score - a.score);
    console.log("test1234");
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = width;
    let context = this.ctx;
    context.canvas.style.width = "100%";
    for (let i = 0; true; ++i) {
      const q = quads.pop();
      if (q === undefined || q.score < 50) break;
      const qs = q.split();
      console.log("checkpoint0");
      console.log(q, qs);
      const qsi = d3.interpolate([q, q, q, q], qs);
      console.log("checkpoint1");
      console.log(qsi);
      qs.forEach(quads.push, quads);
      console.log("checkpoint2");
      console.log(qs);
      for (let j = 1, m = Math.max(1, Math.floor(q.w / 10)); j <= m; ++j) {
        const t = d3.easeCubicInOut(j / m);
        context.clearRect(q.x, q.y, q.w, q.h);
        for (const s of qsi(t)) {
          context.fillStyle = s.color;
          context.beginPath()
          context.moveTo(s.x + s.w, s.y + s.h / 2);
          context.arc(s.x + s.w / 2, s.y + s.h / 2, s.w / 2, 0, 2 * Math.PI);
          context.fill();
          return context.canvas;
        }
      }
      return context.canvas;
    }
    return null;
  }
}
