import './sass/main.scss';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';

// import components
import Blocks from './components/blocks';
import Navbar from './components/navbar';
import BlockCards from './components/block-card';

// initalize components
const blocks = new Blocks();
const navbar = new Navbar();
const blockCards = new BlockCards();