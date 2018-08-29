import Vue from 'vue';

/*
 * NOTE: Although this doesn't scale very well, there is currently no other way to make
 * WebStorm etc. recognize the base components than to state them explicitly.
 *
 * Apart from that, this is also the approach that big libraries like element-ui take.
 */

import Headline from './Headline.vue';
import Link from './Link.vue';
import Paragraph from './Paragraph.vue';
import TextInput from './TextInput.vue';

Vue.component('b-headline', Headline);
Vue.component('b-link', Link);
Vue.component('b-paragraph', Paragraph);
Vue.component('b-text-input', TextInput);