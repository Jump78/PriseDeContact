<template>
	<div class="question-group">
		<h2>{{ title }}</h2>
		<div class="screen">
			
			<div v-for="question in questions">

				<div v-if="question.type == 'input'" class="input-box not-active">
					<span class="red-line"></span>
					
	        <text-question
	         :type = "question.content.type"
           :name = "question.content.name"
           :title = "question.content.title"
           :placeholder = "question.content.placeholder">
          </text-question>

	        <button class="ok-question" v-on:click="onOk">Ok</button>
				</div>

				<div v-if="question.type == 'radio'" class="radio-box active">
					<span class="red-line"></span>

					<radio-question
					 :name = "question.content.name"
					 :title = "question.content.title"
					 :options = "question.content.options">
					</radio-question>

					<button class="ok-question" v-on:click="onOk">Ok</button>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
import RadioQuestion from './RadioQuestion';
import TextQuestion from './TextQuestion';

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
    RadioQuestion,
    TextQuestion
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