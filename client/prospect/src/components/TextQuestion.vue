<template>
	<div class="text-question">
		<label :for="name">{{ title }}</label>
	  <input :type="type"
	   :name="name"
	   :id="name"
	   :placeholder="placeholder"
	   v-model="textValue">

	  <button type="button" class="ok-question" v-on:click.prevent="onOk">Ok</button>

	</div>
</template>

<script>

export default {
	name: 'TextQuestion',
	data () {
		return {
			textValue:''
		}
	},
	props: {
		type: {type: String, required: true},
		name: {type: String, required: true},
		title: {type: String, required: true},
		placeholder: {type: String, required: true}
	},
	methods: {
		onOk() {
			this.$emit('send', { val: this.textValue, name: this.name} )
		}
	},
	watch: {
		textValue() {
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

/* input */
div.text-question>* {
	display: block;
}
	.text-question>label {
		margin: 3px auto 15px auto;
	}
	.text-question>input {
		width: 98%;
		border: 0;
		border-bottom: 1px solid #DEDEDE;
		font-size: 1em;
		margin: 10px 0 20px 0;
		padding: 5px 8px;
	}
	.text-question>input::placeholder {
		color: #B0B0B0;
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