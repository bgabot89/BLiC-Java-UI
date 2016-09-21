import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const BASE_URL = 'https://powerful-spire-40053.herokuapp.com';
const makeURL = (query): string => `${BASE_URL}/check?url=${query}`;

@Injectable()
class SearchService {

  private _cache = new Map();

  constructor(private _http: Http) {}

  query(url: string): Observable<any> {
    if (this._cache.get(url)) {
      return Observable.of(this._cache.get(url));
    }
    return Observable.of(url)
      .map(query => makeURL(query))
      .switchMap(url => this._http.get(url).map(res => res.json()))
      .map(response => response.map(item => this._parseItemData(item)))
      .map(response => this._normalize(response, url))
  }

  private _parseItemData(item): normalizedItem {
    return {
      url: item.url,
      status: item.status,
      linkPages: item.linkedFromPages
    };
  }

  private _normalize(data: normalizedItem[], url: string) {
    let normalized = [
      {
        key: 'Errors',
        value: data.filter(r => r.status === 404),
        isCollapsed: false
      },
      {
        key: 'Success',
        value: data.filter(r => r.status === 200),
        isCollapsed: true
      },
      {
        key: 'Others',
        value: data.filter(r => r.status !== 200 && r.status !== 404),
        isCollapsed: true
      }
    ];
    this._cache.set(url, normalized);
    return normalized;
  }
}

interface normalizedItem {
  url: string;
  status: number;
  linkPages: string[]
}

export { SearchService as SearchAPI };
