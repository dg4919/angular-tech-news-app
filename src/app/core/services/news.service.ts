import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface Article {
  id?: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: "root",
})
export class NewsService {
  private apiKey = environment.apiKey;
  private baseUrl = "https://newsapi.org/v2";

  constructor(private http: HttpClient) {}

  /**
   * Get latest tech news headlines
   */
  getLatestTechNews(
    pageSize: number = 12,
    page: number = 1
  ): Observable<NewsApiResponse> {
    let params = new HttpParams()
      .set("category", "technology")
      .set("pageSize", pageSize.toString())
      .set("page", page.toString())
      .set("apiKey", this.apiKey);

    return this.http.get<NewsApiResponse>(`${this.baseUrl}/top-headlines`, {
      params,
    });
  }

  /**
   * Get top headlines by country/category
   */
  getTopHeadlines(
    country: string = "us",
    pageSize: number = 12
  ): Observable<NewsApiResponse> {
    let params = new HttpParams()
      .set("country", country)
      .set("pageSize", pageSize.toString())
      .set("apiKey", this.apiKey);

    return this.http.get<NewsApiResponse>(`${this.baseUrl}/top-headlines`, {
      params,
    });
  }

  /**
   * Search news by query
   */
  searchNews(
    query: string,
    pageSize: number = 12,
    page: number = 1
  ): Observable<NewsApiResponse> {
    let params = new HttpParams()
      .set("q", query)
      .set("pageSize", pageSize.toString())
      .set("page", page.toString())
      .set("sortBy", "publishedAt")
      .set("apiKey", this.apiKey);

    return this.http.get<NewsApiResponse>(`${this.baseUrl}/everything`, {
      params,
    });
  }

  /**
   * Get news by category
   */
  getNewsByCategory(
    category: string,
    pageSize: number = 12,
    page: number = 1
  ): Observable<NewsApiResponse> {
    let params = new HttpParams()
      .set("category", category)
      .set("pageSize", pageSize.toString())
      .set("page", page.toString())
      .set("apiKey", this.apiKey);

    return this.http.get<NewsApiResponse>(`${this.baseUrl}/top-headlines`, {
      params,
    });
  }

  /**
   * Get featured news (latest top headlines)
   */
  getFeaturedNews(pageSize: number = 5): Observable<NewsApiResponse> {
    let params = new HttpParams()
      .set("category", "technology")
      .set("pageSize", pageSize.toString())
      .set("sortBy", "publishedAt")
      .set("apiKey", this.apiKey);

    return this.http.get<NewsApiResponse>(`${this.baseUrl}/top-headlines`, {
      params,
    });
  }

  /**
   * Get trending topics (popular sources)
   */
  getTrendingNews(pageSize: number = 5): Observable<NewsApiResponse> {
    let params = new HttpParams()
      .set("q", "technology")
      .set("pageSize", pageSize.toString())
      .set("sortBy", "popularity")
      .set("apiKey", this.apiKey);

    return this.http.get<NewsApiResponse>(`${this.baseUrl}/everything`, {
      params,
    });
  }
}
