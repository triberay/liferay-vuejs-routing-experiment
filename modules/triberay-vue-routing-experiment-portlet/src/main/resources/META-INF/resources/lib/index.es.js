import Vue from 'vue/dist/vue.common';
import VueRouter  from 'vue-router';
import App from './App';
import { routes } from './routes';
import { store } from './store'

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes,
	base: '/web/triberayvuerouting/'
});

export default function(portletNamespace, siteUrl) {

	Vue.config.productionTip = false;

	syncRoute(siteUrl);

	new Vue({
		el: `#vueRoutingExperimentPortlet`,
		router,
		store,
		template: '<App/>',
		components: { App }
	});
}

export function syncRoute(siteUrl) {
	const surface =
		Liferay.SPA &&
		Liferay.SPA.app &&
		Liferay.SPA.app.surfaces &&
		Liferay.SPA.app.surfaces[document.body.id];

	if (!surface) {
		return Liferay.once('SPAReady', syncRoute);
	} else {
		if (surface.activeChild == surface.defaultChild) {
			console.log("-- initial load of senna");

			router.beforeEach((to, from, next) => {
				let spaCurrentPath = Liferay.SPA.app.activePath;
				let routeToPath = siteUrl + to.path;
				if (spaCurrentPath != routeToPath) {
					console.log("Vue router was triggered, initiating SPA navigation as well: " + routeToPath);
					Liferay.SPA.app.navigate(routeToPath);
				}
				next();
			});

			Liferay.SPA.app.on('endNavigate', function(event) {
				let currentRoute;
				if (router.currentRoute.path == '/') {
					currentRoute = siteUrl + '/home';
				} else {
					currentRoute = siteUrl + router.currentRoute.path;
				}
				let spaToPath = event.path;

				if (spaToPath != currentRoute) {
					let route = spaToPath.substring(spaToPath.lastIndexOf('/'));
					console.log("Liferay SPA navigation was triggered, pushing to Vue router as well: " + route);
					router.push(route);
				}
			});
		}
	}
}
