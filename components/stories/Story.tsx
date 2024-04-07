import classes from './Story.module.scss'


interface StoryProps {
	story: {
		id: string;
		author: string;
		image: string;
		date: string;
	};
}
//Info czy user likuje już to stories
//Na górze w nadrzędnym komponencie pasek które to jest story
//Zatrzymanie story
//Czas po którym story się zmienia, kończy
//Jak kończy to redirect na homepage

const Story = () => {
	return <div className={classes.story}></div>;
};

export default Story;
