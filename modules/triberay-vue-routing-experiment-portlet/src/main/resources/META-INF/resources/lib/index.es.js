import Vue from 'vue/dist/vue.common';
import VueRouter  from 'vue-router';
import App from './App';
import { routes } from './routes';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
	mode: 'history',
	routes,
	base: '/web/triberayvuerouting/'
});

export default function(portletNamespace) {
	syncRoute(router);

	new Vue({
		el: `#vueRoutingExperimentPortlet`,
		router,
		template: '<App/>',
		components: { App }
	});
}

export function syncRoute() {
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

			Liferay.SPA.app.on('beforeNavigate', function(event) {
				console.log("navigating to " + event.path);
				let route = event.path.substring(event.path.lastIndexOf('/'));
				router.push(route);
			});
		}
	}
}
