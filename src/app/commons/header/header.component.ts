import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navTrigger') navTrigger: ElementRef | undefined;

  constructor(
    private rd: Renderer2,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  navTriggerFunction(): void {
    if (this.navTrigger !== undefined) {
      this.navTrigger.nativeElement.classList.toggle('active');
      let mainListDivElement = document.getElementById('mainListDiv');
      if (mainListDivElement) {
        console.log(mainListDivElement.style.display);
        if (mainListDivElement.style.display === "none" || !mainListDivElement.style.display) {
          this.fadeIn(mainListDivElement);
        } else {
          this.fadeOut(mainListDivElement);
        }
      }
    }
  }

  // fadeIn, fadeOut animation
  fadeOut(element: any) {
    var op = 10;  // initial opacity
    var timer = setInterval(() => {
      if (op < 0) {
        clearInterval(timer);
        element.style.display = null;
        element.style.opacity = null;
      } else {
        element.style.opacity = op/10;
        op -= 1;
      }
    }, 10);
  }
  fadeIn(element: any) {
    let op = 0;  // initial opacity
    element.style.opacity = op;
    element.style.display = 'block';
    let timer = setInterval(() => {
      if (op > 10) {
        clearInterval(timer);
      } else {
        element.style.opacity = op/10;
        op += 1;
      }
    }, 10);
  }

}
