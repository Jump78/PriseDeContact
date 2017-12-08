<template>
	<div class="question-group">
		<h2>{{ title }}</h2>
		<div class="screen">
			
			<div v-for="question in questions">

				<div v-if="question.type == 'input'" class="input-box not-active">
					<span class="red-line"></span>
					<label :for="question.content.name">{{ question.content.title }}</label>
	        <input :type="question.content.type"
	        :name="question.content.name"
	        :placeholder="question.content.placeholder">
	        <button class="ok-question" v-on:click="onOk">Ok</button>
				</div>

				<div v-if="question.type == 'radio'" class="radio-box active">
					<span class="red-line"></span>

					<radio-question
					 :name = "question.content.name"
					 :title = "question.content.title"
					 :options = "question.content.options">
					</radio-question>
					<!-- <label for="question.content.name">{{ question.content.title }}</label>

					<div class="flex-options">

						<div v-for="option in question.content.options" class="option">
					    <input type="radio"
					     v-model="picked"
					     :name="question.content.name"
					     :id="option.value"
					     :value="option.value">
					    <label :for="option.value" v-bind:class="{ chose: picked===option.value }">{{ option.label }}</label>
					  </div>

					</div> -->

					<button class="ok-question" v-on:click="onOk">Ok</button>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
import RadioQuestion from './RadioQuestion';

export default {
	name: 'QuestionGroup',
	data () {
		return {
			picked:''
		}
	},
	props: {
		title: {
      type: String,
      required: true,
      default: "Bienvenue",
      validator: function(val) {
        return val.length > 2;
      }
    },
    questions: {
    	type: Array,
    	required: true
    }
	},
	methods: {
		onOk() {
			console.log(`HEEEEY 'ok' button is clicked !`)
			document.getElementsByClassName("screen")[0].scrollTo(0,150)
		}
	},
	components: {
    RadioQuestion
  },
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
div.question-group {
	max-width: calc(500px + 15vw);
	width: 98vw;
}
span.red-line {
	display: block;
	width: 15%;
	height: 1.6px;
	background-color: #F03B58; /* red EcoleM */
	margin: 3px 0 10px 0;
}
div.active {
	opacity: 1;
	margin: 0 auto 80px auto;
}
div.not-active {
	opacity: 0.2;
}

h2 {
	font-size: 2em;
	margin: 1.5em 0 2em 0;
	color: #686768;
}

/* input */
div.input-box>* {
	display: block;
}
	.input-box>label {
		margin: 3px auto 15px auto;
	}
	.input-box>input {
		width: 98%;
		border: 0;
		border-bottom: 1px solid #DEDEDE;
		font-size: 1em;
		margin: 10px 0 20px 0;
		padding: 5px 8px;
	}
	.input-box>input::placeholder {
		color: #B0B0B0;
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
	border-radius: 1px;
	border: 1px solid #D0D0D0;
	padding: 8px;
	width: 90px;
	text-align: left;
	box-shadow: 0 0 6px 1px rgba(10,10,10,.08);
	cursor: pointer;
}

</style>