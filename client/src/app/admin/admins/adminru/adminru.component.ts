import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-adminru',
  templateUrl: './adminru.component.html',
  styleUrl: './adminru.component.css'
})
export class AdminruComponent implements OnInit {
  currentUser: Object = {};

  constructor(
    public adminService: AdminService,
    //private activatedRoute: ActivatedRoute
  ) {
    /* let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    }) */
  }

  logout() {
    this.adminService.logout()
  }

  ngOnInit() { }
}
