import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_bg from '../assets/hero5.png'


const tagManagerArgs = {
    gtmId: 'GTM-54RD4XN'
}

TagManager.initialize(tagManagerArgs)

export default function Third_SP() {

	


	const [quiz, setQuiz] = useState("¿Tienes más de 64 años?")
	const [step, setStep] = useState("process")
	const [min, setMin] = useState(3)
	const [second, setSecond] = useState<any>(0)    
	const [yes, setYes] = useState("Sí, tengo 65 años o más")
	const [no, setNo] = useState("No, tengo 64 años o menos")
	
	
	const stepProcess = () => {
		if(step==="Revisando sus respuestas..."){
			setTimeout(() => {
			  setStep("Coincidencia con las mejores opciones...")
			  }, 1500);
			}
		  if(step==="Coincidencia con las mejores opciones..."){
			setTimeout(() => {
			  setStep("Confirmación de elegibilidad...")
			  }, 1500);
			}
		  if(step==="Confirmación de elegibilidad..."){
			setTimeout(() => {
			  setStep("completed")

			  axios
				.get(process.env.REACT_APP_PROXY + `/visits/7`)
				.then(({ data }) => {
					const _id = data[0]._id
					const _visits = data[0].visits
					const _views = data[0].views
					const _calls = data[0].calls
					const _positives = data[0].positives
					const _negatives = data[0].negatives
					const visits = {
						visits: _visits,
						views: _views+1,
						calls: _calls,
						positives: _positives,
						negatives: _negatives,
					}
				axios
				.put(
					process.env.REACT_APP_PROXY + `/visits/update-visits7/`+_id,
					visits
				)
				.catch((err) =>
					console.log(err)
				);
			})
			  }, 1500);
			}
	  
		  if(step==="completed"){
			const startTime:any = new Date();
			const timer = setInterval(()=> {
			  const nowTime:any = new Date();
			  setSecond((180-Math.round((nowTime-startTime)/1000))%60)
			  setMin(Math.floor((180-Math.round((nowTime-startTime)/1000))/60))
			}, 1000)
		}
	}

	useEffect(() => {
		stepProcess()
	}, [step])

	const topScroll = (id: any) => {
		scrollTo({ id });
	}

	const handleQuizP = () => {
		topScroll("btn");
		if(quiz === "¿Tienes más de 64 años?"){
			setQuiz("¿Tiene Medicaid o Medicare?")
			setYes("Sí")
			setNo("No")
		}else{
			setStep("Revisando sus respuestas...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/7`)
		.then(({ data }) => {
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			const visits = {
				visits: _visits,
				views: _views,
				calls: _calls,
				positives: _positives+1,
				negatives: _negatives,
			}
		axios
		.put(
			process.env.REACT_APP_PROXY + `/visits/update-visits7/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

	const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "¿Tienes más de 64 años?"){
			setQuiz("¿Tiene Medicaid o Medicare?")
			setYes("Sí")
			setNo("No")
		}else{
			setStep("Revisando sus respuestas...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/7`)
		.then(({ data }) => {
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			const visits = {
				visits: _visits,
				views: _views,
				calls: _calls,
				positives: _positives,
				negatives: _negatives+1,
			}
		axios
		.put(
			process.env.REACT_APP_PROXY + `/visits/update-visits7/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

    return(
        <div>
			<div className='top-sticky-blue' id='top'>My Senior Saving Journal</div>
			{step==="process"?
				<>
				<div className='main-container-5'>
					<div className='main-descrition-5'>
						<div className='main-des-title'>Los estadounidenses mayores de 65 años ahora pueden calificar para la asignación de comestibles de $3600 en 2024.</div>
						<img className='topic-img-5' src = {Head_bg} alt = "head"/>
						<div className='main-des-5'>Los estadounidenses mayores de 65 años pueden solicitar la Tarjeta de Asignación de Comestibles 2024 que les otorga hasta $3600. Los estadounidenses pueden utilizar los fondos para cubrir completamente sus comestibles, medicamentos, etc. en Walmart y miles de otras tiendas participantes.</div>
						<div className='main-des-5' style = {{marginTop:"1rem"}}><b>¡Si aún no ha reclamado su asignación </b>mensual responda las preguntas a continuación y una vez aprobado, recibirá su Asignación de Comestibles de $3,600 por correo en unos pocos días, listo para usar!</div>
					</div>
					<div className='survey'>
					<div className='quiz-5' id='btn'>{quiz}</div>
					<div className='answer'>
						<div className='answer-btn-5' onClick={handleQuizP}>{yes}</div>
						<div className='answer-btn-5' onClick={handleQuizN}>{no}</div>
					</div>
					</div>
				</div>
				</>:
				(
				step!=="process" && step!=="completed"?
					<div className='checking' style={{fontWeight:"700"}}>
					{step}
					</div>:
					<div className='checking'>
						<div className='congrats'>¡Felicitaciones, usted califica!</div>
						<div className='top-description-5'>¡Realiza Una <b>Llamada Rápida</b> Para Reclamar Tu Asignación De Comestibles!</div>
						<div className='spots-count'>Lugares restantes: 4</div>
						<div className='tap-direction-span'>👇 TOCA ABAJO PARA LLAMAR 👇</div>
						<a href = "tel:+18666570134">
							<div className='call-btn' >
								CALL (866) 657-0134
							</div>
						</a>
						<div className='sub-title-span'>Nosotras Hemos Reservado Tu Lugar</div>
						<div className='sub-description'>Debido al alto volumen de llamadas, su agente oficial está esperando solo <b> 3 minutos </b>, luego su lugar no estará reservado.</div>
						<div className='timer'>
							<div className='timer-cell'>{min}</div>
							<div className='timer-cell'>:</div>
							<div className='timer-cell'>{second}</div>
						</div>
					</div>
				)
			}
			<div className='footer'>
				<div className='terms'>Terms & Conditions | Privacy Policy</div>
				<div className='copyright'>Copyright © 2022 - All right reserved Daily America Savings.</div>
			</div>
		</div>
    )
} 
