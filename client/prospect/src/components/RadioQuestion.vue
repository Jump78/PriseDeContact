<template>
	<div class="radio-question">
		<label :for="name">{{ title }}</label>

		<div class="flex-options">

			<div v-for="option in options" class="option">
			  <input type="radio"
			   v-model="picked"
			   :name="name"
			   :id="name+'_'+option.value"
			   :value="option.value">
			  <label :for="name+'_'+option.value" v-bind:class="{ chose: picked === option.value }">
			  	{{ option.label }}
			  </label>
			</div>

		</div>
	<button type="button" class="ok-question" v-on:click.prevent="onOk">Ok</button>
	</div>
</template>

<script>

export default {
	name: 'RadioQuestion',
	data () {
		return {
			picked:''
		}
	},
	props: {
		name: {type: String, required: true},
    title: {type: String, required: true},
    options: {type: Array, required: true}
	},
	methods: {
		onOk() {
			this.$emit('send', { val: this.picked, name: this.name} )
		}
	},
	watch: {
		picked() {
			this.onOk()
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
}
	div.flex-options .option {
		width: 33.333333%;
	}
	@media (max-width: 640px) {
		div.flex-options .option {
			width: 50%;
		}
	}
		div.flex-options .option label {
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
		div.flex-options .option label:hover {
			border: 1px solid #B0B0B0;
			background-color: #FBFBFB;
		}
		div.flex-options .option .chose,
		div.flex-options .option .chose:hover {
			background-color: #2C314E; /* blue EcoleM */
			border-color: #2C314E; /* blue EcoleM */
			color: #FFFFFF;
		}

input[type='radio'] {
	opacity: 0.2;
	display: none;
}

/* ok button */
button.ok-question {
	background: none;
	border: none;
	background-color: #FBFBFB;
	color: #303030;
	font-weight: bold;
	font-size: .9em;
	border-radius: 1px;
	border: 1px solid #D0D0D0;
	padding: 8px;
	width: 90px;
	text-align: left;
	box-shadow: 0 0 6px 1px rgba(10,10,10,.08);
	cursor: pointer;
}

</style>