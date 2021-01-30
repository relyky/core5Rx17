import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Collapse, Container, Fade, Grow, Input, InputAdornment, Paper, Slide, TextField, TextFieldProps, Zoom, IconButton, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LabelSwitch } from 'FormCtrl/all';
import { P1, Pre } from 'Widgets/TypographyEx';
import { SelectFieldBase, SelectInput } from 'FormCtrl/SelectFieldBase';
import { ButtonEx } from 'Widgets/ButtonEx'
import axios from 'axios'
import Cookies from 'universal-cookie'

// resource
const cookies = new Cookies()

//axios.defaults.headers.post['Authorization'] = 'Bearer ' + AuthToken;
//axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'; // mark as an ajax request
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers.post['RequestVerificationToken'] = cookies.get('__RequestVerificationToken');

const useStyles = makeStyles(({ spacing }) => ({
  root: {
  },
  margin: {
    margin: spacing(1)
  },
}));

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const [value, setValue] = useState<LabelValue | null>(null)
  const [inputValue, setInputValue] = useState('');

  const [data, setData] = useState<any>(null);

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <div className={classes.root}>
      <h1>{`${formProfile.FORM_ID}:${formProfile.FORM_TITLE}`}</h1>
      <p>{`${formProfile.FORM_DESCRIPTION}`}</p>

      <FormPaper>
        <Pre>AntiForgeryToken: {cookies.get('__RequestVerificationToken')}</Pre>
        <Pre>{JSON.stringify(data, null, '  ')}</Pre>
        <Pre>{JSON.stringify({ value, inputValue }, null, '  ')}</Pre>

        <ButtonEx label="knock" onClick={() => {
          axios.post('api/Echo/Knock').then(resp => {
            console.log('axios Knock', resp)
            setData(resp.data)
          })
        }} />

        <ButtonEx label="axios" onClick={() => {
          axios({
            method: 'POST',
            url: 'api/Echo/WeatherForecast',
            data: null,
          }).then(resp => {
            console.log('axios then', resp)
            setData(resp.data)
          }).catch(xhr => {
            console.log('axios catch', xhr)
            setData(xhr)
          }).finally(() => {
            console.log('axios finally')
          })
        }} />

        <ButtonEx label="axios antiForgery" onClick={() => {
          axios({
            headers: {
              'RequestVerificationToken': cookies.get('__RequestVerificationToken')
            },
            method: 'POST',
            url: 'api/Echo/WeatherForecastSafe',
            data: null,
          }).then(resp => {
            console.log('axios withCredential then', resp)
            setData(resp.data)
          }).catch(xhr => {
            console.log('axios catch', xhr)
            setData(xhr)
          }).finally(() => {
            console.log('axios finally')
          })
        }} />

        <ButtonEx label="axios 3times" onClick={() => {
          axios({
            headers: {
              'RequestVerificationToken': cookies.get('__RequestVerificationToken')
            },
            method: 'POST',
            url: 'api/Echo/WeatherForecastSafe',
            data: null,
          }).then(resp => {
            console.log('axios 1 then', resp)
            setData(resp.data)
          }).catch(xhr => {
            console.log('axios 1 catch', xhr)
            setData(xhr)
          });

          axios({
            headers: {
              'RequestVerificationToken': cookies.get('__RequestVerificationToken')
            },
            method: 'POST',
            url: 'api/Echo/WeatherForecastSafe',
            data: null,
          }).then(resp => {
            console.log('axios 2 then', resp)
            setData(resp.data)
          }).catch(xhr => {
            console.log('axios 2 catch', xhr)
            setData(xhr)
          });

          axios({
            headers: {
              'RequestVerificationToken': cookies.get('__RequestVerificationToken')
            },
            method: 'POST',
            url: 'api/Echo/WeatherForecastSafe',
            data: null,
          }).then(resp => {
            console.log('axios 3 then', resp)
            setData(resp.data)
          }).catch(xhr => {
            console.log('axios 3 catch', xhr)
            setData(xhr)
          });

        }} />

        <ButtonEx label="axios nest 3times" onClick={() => {
          axios({
            headers: {
              'RequestVerificationToken': cookies.get('__RequestVerificationToken')
            },
            method: 'POST',
            url: 'api/Echo/WeatherForecastSafe',
            data: null,
          }).then(resp => {
            console.log('axios d1 then', resp)
            setData(resp.data)

            axios({
              headers: {
                'RequestVerificationToken': cookies.get('__RequestVerificationToken')
              },
              method: 'POST',
              url: 'api/Echo/WeatherForecastSafe',
              data: null,
            }).then(resp => {
              console.log('axios d2 then', resp)
              setData(resp.data)

              axios({
                headers: {
                  'RequestVerificationToken': cookies.get('__RequestVerificationToken')
                },
                method: 'POST',
                url: 'api/Echo/WeatherForecastSafe',
                data: null,
              }).then(resp => {
                console.log('axios d3 then', resp)
                setData(resp.data)
              }).catch(xhr => {
                console.log('axios d3 catch', xhr)
                setData(xhr)
              });

            }).catch(xhr => {
              console.log('axios d2 catch', xhr)
              setData(xhr)
            });

          }).catch(xhr => {
            console.log('axios d1 catch', xhr)
            setData(xhr)
          });

        }} />

      </FormPaper>

    </div>
  )
}

//------------------------------------------------------------
const FormPaper = withStyles(({ spacing }) => ({
  root: {
    margin: spacing(2),
    padding: spacing(1)
  }
}))(Paper)

//============================================================
const optionList: LabelValue[] = Array.from(Array(100)).map((__, i) => ({
  value: `${101 + i}`,
  label: `我是項目${101 + i}的名稱`
}))
