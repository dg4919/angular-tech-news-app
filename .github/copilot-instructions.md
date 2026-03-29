# Angular Tech News App — Copilot Instructions

Tech news reader app built with **Angular 19** (standalone components, esbuild). Fetches articles from [NewsAPI](https://newsapi.org/v2).

## Build & Dev Commands

```bash
npm install          # install dependencies
ng serve --port 4300 # dev server → http://localhost:4300
ng build             # production build → dist/angular-tech-news-app/
ng test              # Karma unit tests
ng lint              # TSLint
```

## Architecture

```
src/app/
  core/
    models/          # news.model.ts (interfaces — but see Conventions below)
    services/        # news.service.ts (active), http-client.service.ts (dead code)
    interceptors/    # error.interceptor.ts (not currently registered in main.ts)
  features/
    news-list/       # /home and /search routes (NewsListComponent, eager + lazy)
    news-detail/     # /news/:id route (lazy, data passed via router navigation state)
    categories/      # /category/:category route (lazy)
  shared/
    components/      # header, footer, search-bar
    pipes/           # safe.pipe.ts (SafeResourceUrl wrapper)
```

**Routing** (`app.routes.ts`): `/` redirects to `/home`. Feature `*.routes.ts` files in each folder are legacy scaffolding and are **not used**.

**Data flow for detail view**: `NewsDetailComponent` reads article data from `router.getCurrentNavigation().extras.state.article` — no extra API call. If state is absent it redirects home after 2 s.

## Conventions

- **All feature components are standalone** (`standalone: true`) with `imports: [CommonModule, FormsModule, RouterModule]`.
- **Use `inject()` for dependency injection**, not constructor injection.
- **Standard state shape** in every feature component:
  ```ts
  loading = false;
  error: string | null = null;
  newsArticles: Article[] = [];
  currentPage = 1;
  pageSize = 10;
  totalResults = 0;
  ```
- **Import `Article` and `NewsApiResponse`** from `news.service.ts`, not from `news.model.ts` (the model file's interfaces are unused by components).
- **Fallback image**: use the constant `DEFAULT_IMAGE_URL = 'assets/placeholder.svg'` and a `getImageUrl(url)` helper returning the fallback on null/empty.
- **Categories** are hardcoded in `CategoriesComponent` with Bootstrap Icon class names (e.g. `bi-cpu`).

## Key Files

| File                                    | Purpose                                     |
| --------------------------------------- | ------------------------------------------- |
| `src/app/app.routes.ts`                 | Single source of truth for routing          |
| `src/app/core/services/news.service.ts` | All API calls to NewsAPI + type definitions |
| `src/environments/environment.ts`       | `apiKey` and `newsApiUrl`                   |
| `src/assets/styles/global.css`          | Global design tokens and component styles   |
| `src/assets/styles/responsive.css`      | Breakpoint overrides                        |

## Pitfalls

- **`SafePipe` is not standalone** — add `standalone: true` before using it in a standalone component.
- **`ErrorInterceptor` is not registered** — provide it in `main.ts` with `withInterceptors([errorInterceptor])` (functional) or `HTTP_INTERCEPTORS` token (class-based) if you need it active.
- **`HttpClientService`** (`core/services/http-client.service.ts`) is dead code — `NewsService` injects `HttpClient` directly. Don't use it for new features.
- **API key is hardcoded** in both environment files. Do not add a second key or rotate without updating both files.
- **`environment.endpoints`** object is unused — `NewsService` builds URL strings inline.
- **`noImplicitAny: false`** overrides `strict: true` in `tsconfig.json` — implicit `any` will not error.
