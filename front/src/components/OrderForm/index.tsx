import { Form } from 'react-final-form';
import {
	TextField,
	Checkboxes,
	Radios,
	Select,
	DatePicker,
	TimePicker,
} from 'mui-rff';
import {
	Typography,
	Paper,
	Link,
	Grid,
	Button,
	CssBaseline,
	MenuItem,
	GridSize,
  makeStyles,
  Theme
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/init';

interface OrderProps {
  setPrice: number,
}

const useStyles = makeStyles((theme: Theme) => ({
  sendButt: {
    color: 'white',
    backgroundColor: 'black',
  }
}));

export const OrderForm = ({setPrice}: OrderProps) => {
  const classes = useStyles();

  const getUsername = useSelector(
		(state: rootState) => state.userState.user.username
	);

  const getUserEmail = useSelector(
		(state: rootState) => state.userState.user.email
	);

  const getCategoryWorks = useSelector((state: rootState) => state.works?.works)

  interface FormType {
    firstName?: string;
    lastName?: string;
    email?: string;
  }

  interface CustomField {
    size: GridSize;
    field: ReactNode;
  }

	const onSubmit = async (values: FormType) => {
		console.log('Hi');
	};

	const validate = (values: FormType) => {
		const errors: FormType = {};
		if (!values.firstName) {
			errors.firstName = 'Required';
		}
		if (!values.lastName) {
			errors.lastName = 'Required';
		}
		if (!values.email) {
			errors.email = 'Required';
		}
		return errors;
	};


	const formFields: CustomField[] = [
		{
			size: 12,
			field: (
				<TextField
          type="text"
					label="Ваше имя"
					name="firstName"
          value={getUsername}
					margin="none"
					// required={true}
          disabled
				/>
			),
		},
		{
			size: 12,
			field: (
				<TextField
					type="email"
					label="Электронная почта"
					name="email"
          value={getUserEmail}
					margin="none"
					// required={true}
          disabled
				/>
			),
		},
		{
			size: 12,
			field: <TextField name="notes" multiline label="Notes" margin="none" />,
		},
		{
			size: 12,
			field: (
				<Select
					name="city"
					label="Select a City"
					formControlProps={{ margin: 'none' }}
				>
					<MenuItem value="London">Moscow</MenuItem>
					<MenuItem value="Paris">Saint-Petersburg</MenuItem>
				</Select>
			),
		},
		{
			size: 6,
			field: (
				<DatePicker
					name="date"
					margin="normal"
					label="Дата"
					dateFunsUtils={DateFnsUtils}
				/>
			),
		},
		{
			size: 6,
			field: (
				<TimePicker
					name="time"
					margin="normal"
					label="Время"
					dateFunsUtils={DateFnsUtils}
				/>
			),
		},
	];

	return (
		<div style={{ padding: 16, margin: 'auto', maxWidth: 480 }}>
			<CssBaseline />
			{/* <Typography variant="h5" align="center" component="h2" gutterBottom>
				Форма заказа
			</Typography>
			<Typography paragraph>
				<Link href="https://github.com/erikras/react-final-form#-react-final-form">
					Read Docs
				</Link>
			</Typography> */}
			<Form<FormType>
				onSubmit={onSubmit}
				// initialValues={{ employed: true, stooge: 'larry' }}
				// validate={validate}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit} noValidate>
						<Paper style={{ padding: 16 }}>
							<Grid container alignItems="flex-start" justify="center" spacing={2}>
								{formFields.map((item, idx) => (
									<Grid item xs={item.size} key={idx}>
										{item.field}
									</Grid>
								))}
                {/* <Grid item xs={12} style={{ marginTop: 16, textAlign: 'center'}}><span>Цена: {setPrice} руб</span></Grid> */}
								<Grid item xs={12} style={{ marginTop: 16 , display: 'flex'}} justify="center">
									<Button
										variant="contained"
										type="submit"
                    className={classes.sendButt}
										disabled={submitting}
									>
										Отправить
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</form>
				)}
			/>
		</div>
	);
};
