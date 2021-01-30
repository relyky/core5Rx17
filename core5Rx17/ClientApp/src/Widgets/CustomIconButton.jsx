import React from 'react'
import clsx from 'clsx'
import { IconButton, withStyles } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

export const ExpandIconButton = withStyles(({ transitions }) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: transitions.create('transform', {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))
(({expanded, onClick, classes} /* props */) => {
  console.log('CheckedIconButton', {expanded, onClick, classes})
  return (
    <IconButton
      className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      onClick={onClick}
    >
      <ExpandMoreIcon />
    </IconButton>
  )
})
