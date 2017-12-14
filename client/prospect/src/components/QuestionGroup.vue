<template>
	<div class="question-group">
		<div class="grid-5 global-t-zone">
			<div class="col-1"></div>
			<div class="col-3 title-box">
				<h2>{{ title }}</h2>
			</div>
			<div class="col-1"></div>
		</div>
		
		<div class="grid-5 screen global-q-zone">
			<div class="col-1"></div>
			<div class="col-3">

				<div class="ghost-block">
				</div>

				<div v-for="(question, index) in questions">

					<div v-if="question.type == 'text'" class="question-box text-box">
						<div :class="'flag'+index">
							<span class="red-line"></span>
						</div>

			      <text-question
			       :type = "question.content.type"
		         :name = "question.content.name"
		         :title = "question.content.title"
		         :placeholder = "question.content.placeholder">
		        </text-question>

			      <button type="button" class="ok-question" v-on:click.prevent="onOk">Ok</button>
					</div>

					<div v-if="question.type == 'radio'" class="question-box radio-box">
						<span class="red-line"></span>

						<radio-question
						 :name = "question.content.name"
						 :title = "question.content.title"
						 :options = "question.content.options">
						</radio-question>

						<button type="button" class="ok-question" v-on:click.prevent="onOk">Ok</button>
					</div>

				</div>

				<div class="ghost-block">
				</div>
				
			</div>
			<div class="col-1"></div>

			
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

.screen {
	overflow-x: hidden;
}

.question-group {
	width: 100vw;
	display: inline-block;
}

.title-box {
	padding: 5vh 0 1vh 0;
}

button {
	font-size: .9em;
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
	margin-bottom: 150px;
}
div.not-active {
	opacity: 0.2;
}
.question-box {
	margin-bottom: 110px;
}
h2 {
	font-size: 2em;
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

div.ghost-block {
	height: 17vh;
	width: 1px;
}

@media (max-width: 640px) {
	.question-box {
		margin-bottom: 50px;
	}
}

</style>