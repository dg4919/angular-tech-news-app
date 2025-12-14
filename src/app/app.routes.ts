import { Routes } from "@angular/router";
import { NewsListComponent } from "./features/news-list/news-list.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    component: NewsListComponent,
  },
  {
    path: "news/:id",
    loadComponent: () =>
      import("./features/news-detail/news-detail.component").then(
        (m) => m.NewsDetailComponent
      ),
  },
  {
    path: "search",
    loadComponent: () =>
      import("./features/news-list/news-list.component").then(
        (m) => m.NewsListComponent
      ),
  },
  {
    path: "category/:category",
    loadComponent: () =>
      import("./features/categories/categories.component").then(
        (m) => m.CategoriesComponent
      ),
  },
  { path: "**", redirectTo: "home" },
];
