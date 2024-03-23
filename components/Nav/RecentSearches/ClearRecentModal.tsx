import ModalBox from '@/components/UI/ModalBox';
import Setting from '@/components/UI/Settings/Setting';
import classes from './ClearRecentModal.module.scss';

interface ClearRecentModalProps {
	onClose: () => void;
	onClear: () => void;
}

const ClearRecentModal: React.FC<ClearRecentModalProps> = ({
	onClose,
	onClear,
}) => {
	return (
		<ModalBox onClose={onClose}>
			<div className={classes.note}>
				<span>Clear your search history?</span>
				<p>
					This operation cannot be undone. If you delete the search history, you
					can still see previously searched accounts in the proposed results.
				</p>
			</div>
			<ul>
				<Setting onClick={onClear} red>
					Clear All
				</Setting>
				<Setting onClick={onClose}>Not now</Setting>
			</ul>
		</ModalBox>
	);
};

export default ClearRecentModal;
