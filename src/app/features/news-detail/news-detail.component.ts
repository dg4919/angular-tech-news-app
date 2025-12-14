import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Article } from "../../core/services/news.service";

@Component({
  selector: "app-news-detail",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./news-detail.component.html",
  styleUrls: ["./news-detail.component.css"],
})
export class NewsDetailComponent implements OnInit {
  article: Article | null = null;
  loading: boolean = true;
  private readonly DEFAULT_IMAGE_URL = "assets/placeholder.svg";

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Get article data from router state
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state?.article) {
        this.article = navigation.extras.state.article;
        this.loading = false;
      } else if (params["url"]) {
        // Fallback: try to get from URL parameter
        this.loadArticleFromUrl(params["url"]);
      }
    });
  }

  private loadArticleFromUrl(url: string): void {
    // Since we can't fetch individual articles from NewsAPI,
    // we'll redirect back to the list if article data is not available
    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 2000);
  }

  goBack(): void {
    this.router.navigate(["/home"]);
  }

  getImageUrl(url: string | null): string {
    return url || this.DEFAULT_IMAGE_URL;
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    // Prevent infinite loop by checking if already set to placeholder
    if (imgElement.src.indexOf(this.DEFAULT_IMAGE_URL) === -1) {
      imgElement.src = this.DEFAULT_IMAGE_URL;
    }
  }
}
