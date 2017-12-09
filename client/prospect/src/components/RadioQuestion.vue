<template>
	<div class="radio-question">
		<label :for="name">{{ title }}</label>

		<div class="flex-options">

			<div v-for="option in options" class="option">
			  <input type="radio"
			   v-model="picked"
			   :name="name"
			   :id="option.value"
			   :value="option.value">
			  <label :for="option.value" v-bind:class="{ chose: picked === option.value }">
			  	{{ option.label }}
			  </label>
			</div>

		</div>

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
	div.flex-options label {
		display: inline-block;
		width: 190px;
		text-align: center;
		background-color: #F9F9F9;
		border-radius: 1px;
		border: 1px solid #DEDEDE;
		margin: 3px 5px 3px 0;
		padding: 1px 0;
		cursor: pointer;
	}
	div.flex-options label:hover {
		border: 1px solid #B0B0B0;
		background-color: #FBFBFB;
	}
	div.flex-options .chose,
	div.flex-options .chose:hover {
		background-color: #2C314E; /* blue EcoleM */
		border-color: #2C314E; /* blue EcoleM */
		color: #FFFFFF;
	}

input[type='radio'] {
	opacity: 0.2;
	display: none;
}

</style>