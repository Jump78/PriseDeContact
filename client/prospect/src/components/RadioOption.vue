<template>

	<div class="option" @click.prevent="valueTransmit">
	  <input type="radio"
	   :name="name"
	   :id="name+'_'+value"
	   :value="value">
	  <label :for="name+'_'+value">
	  	{{ label }}
	  </label>
	</div>

</template>

<script>
import {TweenLite, TimelineLite} from 'gsap'

export default {
	name: 'RadioOption',
	props: {
		name: {type: String, required: true},
    value: {type: String, required: true},
    label: {type: String, required: true}
	},
	methods: {
		valueTransmit() {
			this.$emit('send', { val: this.value, name: this.name} )
		}
	}
}

</script>

<style scoped>

input,
select,
button,
input:focus,
select:focus,
button:focus {
  outline: none;
  border: none;
}

	/* radio */
div.flex-options {
	display: flex;
	flex-wrap: wrap;
	margin: calc(12px + 2vh) auto;
	text-align: center;
}
	div.flex-options .option {
		display: flex;
		align-items: center;
		width: calc(33.233333% - 7px);
		margin-right: 5px;
	}
	@media (max-width: 640px) {
		div.flex-options .option {
			width: calc(49.99999% - 7px);
		}
	}
		.option {
			display: inline-block;
			width: calc(100% - 6px);
			text-align: center;
			background-color: #F9F9F9;
			border-radius: 1px;
			border: 1px solid #DEDEDE;
			margin: 3px 0;
			padding: 1px 0;
			cursor: pointer;
		}
		.option:hover {
			border: 1px solid #B0B0B0;
			background-color: #FBFBFB;
		}
		div.flex-options .choose.option,
		div.flex-options .choose:hover.option {
			background-color: #2C314E; /* blue EcoleM */
			border-color: #2C314E; /* blue EcoleM */
			color: #FFFFFF;
		}
		.option label {
			margin: 0 auto;
			cursor: pointer;
			user-select: none;
		}

input[type='radio'] {
	opacity: 0.2;
	display: none;
}

</style>