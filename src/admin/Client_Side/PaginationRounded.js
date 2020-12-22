import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationRounded({resultPerPage, totalResult, paginate}) {
  const classes = useStyles();

  const pageNumbers = [];
  let count = 1;

  for (let i = 1; i <= Math.ceil(totalResult / resultPerPage); i++){
      pageNumbers.push(i);
      count = i;
  }

  return (
    <div className={classes.root}>
      <Pagination count={count} onChange={paginate} variant="outlined" shape="rounded" />
    </div>
  );
}