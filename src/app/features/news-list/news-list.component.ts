import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import {
  NewsService,
  Article,
  NewsApiResponse,
} from "../../core/services/news.service";

@Component({
  selector: "app-news-list",
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatRippleModule],
  templateUrl: "./news-list.component.html",
  styleUrls: ["./news-list.component.css"],
})
export class NewsListComponent implements OnInit {
  newsArticles: Article[] = [];
  loading: boolean = true;
  error: string | null = null;
  currentPage: number = 1;
  pageSize: number = 12;
  totalResults: number = 0;
  searchQuery: string = "";
  private readonly DEFAULT_IMAGE_URL = "assets/placeholder.svg";

  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["q"]) {
        this.searchQuery = params["q"];
        this.currentPage = 1;
        this.searchNews();
      } else {
        this.fetchNews();
      }
    });
  }

  fetchNews(): void {
    this.loading = true;
    this.error = null;
    this.newsService
      .getLatestTechNews(this.pageSize, this.currentPage)
      .subscribe({
        next: (data: NewsApiResponse) => {
          this.newsArticles = data.articles || [];
          this.totalResults = data.totalResults || 0;
          this.loading = false;
        },
        error: (error) => {
          console.error("Error loading news:", error);
          this.error =
            error.status === 401
              ? "Invalid API key. Please check your NewsAPI key in environment.ts"
              : "Failed to load news articles. Please try again later.";
          this.loading = false;
        },
      });
  }

  searchNews(): void {
    if (!this.searchQuery.trim()) {
      this.fetchNews();
      return;
    }

    this.loading = true;
    this.error = null;
    this.newsService
      .searchNews(this.searchQuery, this.pageSize, this.currentPage)
      .subscribe({
        next: (data: NewsApiResponse) => {
          this.newsArticles = data.articles || [];
          this.totalResults = data.totalResults || 0;
          this.loading = false;
        },
        error: (error) => {
          console.error("Error searching news:", error);
          this.error = "Failed to search news articles. Please try again.";
          this.loading = false;
        },
      });
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalResults) {
      this.currentPage++;
      if (this.searchQuery) {
        this.searchNews();
      } else {
        this.fetchNews();
      }
      window.scrollTo(0, 0);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.searchQuery) {
        this.searchNews();
      } else {
        this.fetchNews();
      }
      window.scrollTo(0, 0);
    }
  }

  getTruncatedText(text: string, chars: number = 150): string {
    if (!text) return "";
    return text.length > chars ? text.substring(0, chars) + "..." : text;
  }

  getImageUrl(url: string | null): string {
    return url || this.DEFAULT_IMAGE_URL;
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    // Prevent infinite loop by checking if already attempted to load placeholder
    if (!imgElement.dataset["fallback"]) {
      imgElement.dataset["fallback"] = "true";
      imgElement.src = this.DEFAULT_IMAGE_URL;
    }
  }

  openArticle(url: string): void {
    window.open(url, "_blank");
  }
}
