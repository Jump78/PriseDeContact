<template>
	<div class="text-question">
		<label :for="name">{{ title }}</label>
	  <input :type="type"
	   :name="name"
	   :placeholder="placeholder">

	</div>
</template>

<script>

export default {
	name: 'TextQuestion',
	data () {
		return {
			picked:''
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

</style>