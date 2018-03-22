export interface NgxDashboardEvent {

    /**
     * The event id.
     */
    id: string;

    /**
     * The icon name.
     */
    icon: string;
}

export interface NavigationGroup {

    /**
     * The title of the navigation group.
     */
    title: string;

    /**
     * The description of the navigation group.
     */
    description?: string;

    /**
     * The state of the navigation group.
     */
    state: 'opened' | 'closed';

    /**
     * The items of the navigation group.
     */
    items: NavigationItem[];

}

export interface NavigationItem {

    /**
     * The title of the navigation item.
     */
    title: string;

    /**
     * The relative href to the location.
     */
    href: string;

    /**
     * The icon of the navigation item.
     */
    icon?: string;

    /**
     * If the href should be exact.
     */
    exact?: boolean;

}
