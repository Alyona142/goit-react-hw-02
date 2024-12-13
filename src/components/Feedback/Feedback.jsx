import styles from './Feedback.module.css';

const Feedback = ({ feedback, totalFeedback, positiveFeedback }) => (
	<ul className={styles.wrapper}>
		{Object.entries(feedback).map(([key, value]) => (
			<li className={styles.text} key={key}>
				{key}: <b>{value}</b>
			</li>
		))}
		<li>Total: <b>{totalFeedback}</b></li>
		<li>Positive: <b>{positiveFeedback}%</b></li>
	</ul>
);

export default Feedback;