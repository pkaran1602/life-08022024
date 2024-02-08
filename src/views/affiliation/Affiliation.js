
import {MaterialReactTable} from 'material-react-table';




const Affiliation = (props) => {
  
  const{table}=props

  return (
    <>
     <MaterialReactTable table={table} />;
    </>
    )
};

export default Affiliation;
