export class QueryString {
    public static createQueryString(queryParams: string[]): string {
        let quryUrl: string = "";
        if (queryParams && queryParams.length > 0)
          quryUrl = "?" + queryParams.join("&");
        return quryUrl;
      }
}