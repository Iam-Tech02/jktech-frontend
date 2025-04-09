import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "blog",
        loadChildren: () =>
          import("../features/blog/blog.module").then((m) => m.BlogModule),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("../features/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class LayoutModule {}
