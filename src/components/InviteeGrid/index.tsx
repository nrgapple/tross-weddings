import DataEditor, {
  GridColumn,
  GridColumnIcon,
  Item,
  GridCell,
  GridCellKind,
} from '@glideapps/glide-data-grid';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '@glideapps/glide-data-grid/dist/index.css';

export const InviteeGrid = () => {
  return (
    <DataEditor getCellContent={getData} columns={columns} rows={data.length} />
  );
};

const columns: GridColumn[] = [
  {
    title: 'First Name',
    id: 'firstName',
    width: 250,
    icon: GridColumnIcon.HeaderString,
    overlayIcon: GridColumnIcon.RowOwnerOverlay,
  },
  {
    title: 'Last Name',
    id: 'lastName',
    width: 250,
    icon: GridColumnIcon.HeaderString,
    overlayIcon: GridColumnIcon.RowOwnerOverlay,
  },
  {
    title: 'Photo',
    id: 'photo',
    width: 80,
    icon: GridColumnIcon.HeaderImage,
  },
];

const data = [
  {
    firstName: 'John',
    lastName: 'Doe',
    photo: 'https://picsum.photos/200',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    photo: 'https://picsum.photos/200',
  },
];

function getData([col, row]: Item): GridCell {
  const person = data[row];
  console.log({ person, col });

  if (col === 0) {
    return {
      kind: GridCellKind.Text,
      data: person!.firstName,
      allowOverlay: false,
      displayData: person!.firstName,
    };
  } else if (col === 1) {
    return {
      kind: GridCellKind.Text,
      data: person!.lastName,
      allowOverlay: false,
      displayData: person!.lastName,
    };
  } else if (col === 2) {
    return {
      kind: GridCellKind.Image,
      data: [person!.photo],
      allowOverlay: false,
      displayData: [person!.photo],
      allowAdd: true,
    };
  } else {
    throw new Error();
  }
}

export default InviteeGrid;
