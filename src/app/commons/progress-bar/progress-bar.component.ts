import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   // for window scroll events
  @HostListener('window:scroll', ['$event']) onScroll($event: any) {
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    let progress = (window.pageYOffset / totalHeight) * 100;
    if (!progress) progress = 0;

    let progressBarElement = document.getElementById("progress-bar");
    if (progressBarElement) progressBarElement.style.height = progress + "%";
    
    let percentElement = document.getElementById("percent");
    if (percentElement) percentElement.innerHTML = `Page Scrolled ${Math.min(100, Math.round(progress))}%`;
  }

}
