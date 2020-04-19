import React from 'react';
import Loadable from 'react-loadable';
import { Route, withRouter } from '@components/Router';
import Footer from '@components/Footer';
import Hero from '@components/Hero';
import style from './index.module.css';

// Route-Split Components
const loading = () => <div>Loading...</div>;
const load = loader => Loadable({ loader, loading });

const Home = load(() => import('@pages/Home'));
const About = load(() => import('@pages/About'));
const Article = load(() => import('@pages/Article'));
const Blog = load(() => import('@pages/Blog'));

class App extends React.Component {
	componentDidMount() {
		// attach route manifest to global
		fetch('/rmanifest.json').then(r => r.json()).then(data => {
			window._rmanifest_ = data;
		});

		if (process.env.NODE_ENV === 'production') {
			this.props.history.listen(obj => {
				if (window.ga) window.ga.send('pageview', {dp: obj.pathname});
			});
		}
	}

	render() {
		return (
			<div className={ style.app }>
				<Hero />
				<main className={ style.wrapper }>
					<Route path="/" exact component={ Home } />
					<Route path="/blog" exact component={ Blog } />
					<Route path="/blog/:title" component={ Article } />
					<Route path="/about" exact component={ About } />
				</main>
				<Footer />
			</div>
		);
	}
}

export default withRouter(App);
