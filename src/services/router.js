import { Router } from "@vaadin/router";

const outlet = document.querySelector('#router-outlet');
export const router = new Router(outlet);

router.setRoutes([
    {path: '/', component: 'chapter-list'},
    {path: '/chapter/:chapterId', component: 'chapter-view'}
])