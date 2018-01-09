<template>
	<div class="question-group">
		<div class="grid-5 global-t-zone">
			<div class="col-1"></div>
			<div class="col-3 title-box">
				<h2>{{ title }}</h2>
			</div>
			<div class="col-1"></div>
		</div>
		
		<div class="grid-5 screen global-q-zone" :id="'global-q-zone-'+number">
			<div class="col-1"></div>
			<div class="col-3">

				<div class="ghost-block">
				</div>

				<div v-for="(question, index) in questions">

					<div v-if="question.type == 'text'" class="question-box text-box">
						<div :id="'flag-'+index">
							<span class="red-line"></span>
						</div>

			      <text-question @send="send"
			       :type = "question.content.type"
		         :name = "question.content.name"
		         :title = "question.content.title"
		         :placeholder = "question.content.placeholder">
		        </text-question>

		        <button type="button" class="ok-question" v-on:click.prevent="onOk('flag-'+(index+1))">Ok</button>

					</div>

					<div v-if="question.type == 'radio'" class="question-box radio-box">
						<div :class="'flag'+index">
							<span class="red-line"></span>
						</div>

						<radio-question @send="send"
						 :name = "question.content.name"
						 :title = "question.content.title"
						 :options = "question.content.options">
						</radio-question>
	
				  	<button type="button" class="ok-question" v-on:click.prevent="onOk">Ok</button>

					</div>

				</div>

				<div class="ghost-block">
				</div>

				<p id="myDivP">My Div P</p>
				
			</div>
			<div class="col-1"></div>

			
		</div>
	</div>
</template>

<script>
import RadioQuestion from './RadioQuestion';
import TextQuestion from './TextQuestion';
import {TweenLite} from 'gsap'

export default {
	name: 'QuestionGroup',
	data () {
		return {
			picked:''
		}
	},
	props: {
		number: {
			type: String,
			required: true
		},
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
		send: function( value ) {
			console.log('e')
			this.$emit('send', value)
			//document.getElementsByClassName("screen")[0].scrollTo(0,150)
		},
		onOk(divId) {
			console.log('heyho', divId)
			let zone = document.getElementById('global-q-zone-'+this.number)
			TweenLite.to(zone, .6, {scrollTo:{y:'#'+divId, offsetY:0}});
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

[id*="flag"] {
	padding-top: calc(10px + .5vh);
}

.question-group {
	width: 100vw;
	display: inline-block;
}

.title-box {
	padding: 5vh 0 1vh 0;
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

div.ghost-block {
	height: 17vh;
	width: 1px;
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

@media (max-width: 640px) {
	.question-box {
		margin-bottom: 50px;
	}
}

</style>