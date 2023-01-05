import { Component, OnInit } from '@angular/core';
import { CategorysService } from 'src/app/services/categorys.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categoryname: string = ""
  public activemessage = false
  public message: string = ""
  public category: any
  constructor(private categoryservice: CategorysService) { }

  ngOnInit(): void {
  }
  addnewcategory() {
    this.category = {
      Type: this.categoryname
    }
    this.categoryservice.savecategory(this.category).subscribe(
      data => {
        this.activemessage = true
        this.message = "Se creo correctamente la categoria"
      }
    )
  }
}
