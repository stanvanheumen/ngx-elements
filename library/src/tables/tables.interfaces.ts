import {Observable} from 'rxjs/Observable';

export interface Pager {
    pageSize: number;
    pageNumber: number;
    totalItems?: number;
}

export interface TablePage<T> {
    totalItems: number;
    pageSize: number;
    pageNumber: number;
    data: T[];
}

export interface TableSort {
    [key: string]: 'asc' | 'desc' | boolean;
}

export interface TableTrigger {
    pager: Pager;
    sort: TableSort;
    query: string;
    queryFields: string[];
}

export interface TableDataSource<T = any> {
    onEvent(trigger: TableTrigger): Observable<TablePage<T>>;
}
