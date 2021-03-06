import { connect } from 'react-redux';
import IceboxList from '../components/iceboxList';
import { SORT_EXPIRATION, SORT_FOODGROUP, SORT_FOODNAME, ASCENDING, DESCENDING } from '../constants/sorts';
import * as actions from '../actions';
import _ from 'lodash'

const orderIceboxItems = (items, sortBy, sortOrder, searchTerm) => {
	let sorted;
	switch (sortBy) {
		case SORT_EXPIRATION:
			return itemSorter(items, "expiration", sortOrder, searchTerm);
		case SORT_FOODGROUP:
			return itemSorter(items, "foodGroup", sortOrder, searchTerm);
		case SORT_FOODNAME:
			return itemSorter(items, "name", sortOrder, searchTerm);
	}
}

const itemSorter = (array, sortBy, sortOrder, searchTerm) => {
	if(sortOrder === ASCENDING){
		return _.chain(array)
			.sortBy((item) => item[sortBy])
			.filter((item) => {
				return !searchTerm ? true : (!!~item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) || !!~item.foodGroup.toLowerCase().indexOf(searchTerm.toLowerCase())) ? true : false;
			})
			.value() 
	} else {
		return _.chain(array)
			.sortBy((item) => item[sortBy])
			.filter((item) => {
				return !searchTerm ? true : (!!~item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) || !!~item.foodGroup.toLowerCase().indexOf(searchTerm.toLowerCase())) ? true : false;
			})
			.reverse()
			.value() 
	}
}

const mapStateToProps = state => ({
	contents: orderIceboxItems(state.icebox.contents, state.sortBy, state.sortOrder, state.iceboxSearch),
	trashContents: state.icebox.trashContents,
})

const VisibleIceboxList = connect(mapStateToProps,actions)(IceboxList);

export default VisibleIceboxList;