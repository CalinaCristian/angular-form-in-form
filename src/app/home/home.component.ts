import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public formState: ({ [key: string]: any }) = {};

  constructor(
  ) { }

  ngOnInit() {
    if (history.state.data) {
      this.formState[history.state.data.form] = history.state.data;
    }
  }
}
