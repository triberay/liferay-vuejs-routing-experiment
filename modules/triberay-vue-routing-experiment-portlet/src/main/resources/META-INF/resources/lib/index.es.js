import Vue from 'vue/dist/vue.common';
import App from './App';
import { router } from './router';
import { store } from './store'

export default function(portletNamespace, siteUrl) {

	Vue.config.productionTip = false;

	const surface =
		Liferay.SPA &&
		Liferay.SPA.app &&
		Liferay.SPA.app.surfaces &&
		Liferay.SPA.app.surfaces[document.body.id];

	if (surface && surface.activeChild == surface.defaultChild) {

		router.beforeEach((to, from, next) => {
			let spaCurrentPath = Liferay.SPA.app.activePath;
			let routeToPath = siteUrl + to.fullPath;
			if (spaCurrentPath != routeToPath) {
				if (to.params && to.params.id) {
					routeToPath = siteUrl + to.matched[0].path + "/#" + to.params.id;
				}
				console.log("Vue router was triggered, initiating SPA navigation as well: " + routeToPath);
				Liferay.SPA.app.navigate(routeToPath);
			}
			next();
		});

		Liferay.SPA.app.on('endNavigate', function(event) {
			let spaToPath = event.path;
			if (spaToPath.startsWith(siteUrl)) {
				let currentRoute;
				if (router.currentRoute.path == '/') {
					currentRoute = siteUrl + '/home';
				} else {
					currentRoute = siteUrl + router.currentRoute.path;
				}
				spaToPath = spaToPath.replace("#", "");

				if (spaToPath != currentRoute) {
					let route = spaToPath.substring(siteUrl.length);
					console.log("Liferay SPA navigation was triggered, pushing to Vue router as well: " + route);
					router.push(route);
				}
			}
		});

		vueInst = new Vue({
			el: `#${portletNamespace}-1`,
			router,
			store,
			template: '<App/>',
			components: { App }
		});
	} else if(vueInst) {
		document.getElementById("vueApp").appendChild(vueInst.$el);
	}
}
