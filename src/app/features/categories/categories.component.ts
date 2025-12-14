import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, ActivatedRoute } from "@angular/router";
import {
  NewsService,
  Article,
  NewsApiResponse,
} from "../../core/services/news.service";

@Component({
  selector: "app-categories",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit {
  categories = [
    { id: "technology", name: "Technology", icon: "bi-cpu" },
    { id: "business", name: "Business", icon: "bi-briefcase" },
    { id: "science", name: "Science", icon: "bi-lightbulb" },
    { id: "health", name: "Health", icon: "bi-heart-pulse" },
    { id: "entertainment", name: "Entertainment", icon: "bi-film" },
    { id: "sports", name: "Sports", icon: "bi-cup" },
  ];

  selectedCategory: string = "technology";
  newsArticles: Article[] = [];
  loading: boolean = true;
  error: string | null = null;
  currentPage: number = 1;
  pageSize: number = 12;
  totalResults: number = 0;

  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["category"]) {
        this.selectedCategory = params["category"];
      }
      this.fetchNewsByCategory(this.selectedCategory);
    });
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.currentPage = 1;
    this.fetchNewsByCategory(categoryId);
  }

  fetchNewsByCategory(category: string): void {
    this.loading = true;
    this.error = null;
    this.newsService
      .getNewsByCategory(category, this.pageSize, this.currentPage)
      .subscribe({
        next: (data: NewsApiResponse) => {
          this.newsArticles = data.articles || [];
          this.totalResults = data.totalResults || 0;
          this.loading = false;
        },
        error: (error) => {
          console.error("Error loading news:", error);
          this.error =
            "Failed to load news for this category. Please try again later.";
          this.loading = false;
        },
      });
  }

  getCategoryName(id: string): string {
    const cat = this.categories.find((c) => c.id === id);
    return cat?.name || id;
  }

  getTruncatedText(text: string, chars: number = 150): string {
    if (!text) return "";
    return text.length > chars ? text.substring(0, chars) + "..." : text;
  }

  getImageUrl(url: string | null): string {
    return url || "assets/placeholder.png";
  }
}
