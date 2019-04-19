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
				console.log("  info: Vue routing to  :  " + routeToPath);
				console.log("  info: SPA current path: " + spaCurrentPath);
				if (spaCurrentPath != routeToPath) {
					console.log("init SPA navigation to " + routeToPath);
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
				console.log("  info: SPA navigating to: " + spaToPath);
				console.log("  info: Vue current route: " + currentRoute);

				if (spaToPath != currentRoute) {
					let route = spaToPath.substring(spaToPath.lastIndexOf('/'));
					console.log("init router push to " + route);
					router.push(route);
				}
			});
		}
	}
}
