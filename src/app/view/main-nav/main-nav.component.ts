import { Component } from '@angular/core';
import { HandsetService } from '../../services/handset/handset.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  handset = this.handsetService.isHandset$;

  constructor(private handsetService: HandsetService) {}

}
