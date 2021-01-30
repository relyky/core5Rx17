import React from 'react'
import clsx from 'clsx'
import { Avatar, Box, Button, CardActionArea, CardHeader, CardMedia, Chip, Container, InputAdornment, Radio, TextField, useMediaQuery, useTheme } from '@material-ui/core'
import { Card, CardContent, CardActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { useFormGroupData, useStoreActions, useTypedSelector } from 'store/store'
import { Blockquote, BR, H2, H3, H4 as H4Base, H5 as H5Base, H6, P1, P2, Subtitle1, Subtitle2 } from 'Widgets/TypographyEx'
import { CheckListCtrl, RadioCtrl } from './CustomWidgets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteRight, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faHandPointDown } from '@fortawesome/free-regular-svg-icons'
import { CustomSlider } from './PrettoSlider'
import {
  Check as BlankIcon,
  Check as CheckedIcon,
} from '@material-ui/icons'
import { useMySwal } from 'hooks/useMySwal'
import { ButtonEx } from 'Widgets/ButtonEx'

export default function AppForm({ formProfile }: AppFormProps) {
  //const classes = useStyles();
  const { confirm } = useMySwal()

  const { formData } = useTypedSelector(store => store)
  const { assignValue } = useStoreActions()
  const [q1Group, assignQ1Group] = useFormGroupData('q1Group')
  const [q2Group, assignQ2Group] = useFormGroupData('q2Group')
  const [q9Group, assignQ9Group] = useFormGroupData('q9Group')

  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <FormContainer>
      <Card>
        <ImageCardMedia
          image={`${process.env.PUBLIC_URL}/content/images/UI問券樣板poster.png`}
          title="UI問券樣板"
        />

        <CardHeader
          avatar={
            <Avatar aria-label="recipe">Asvt</Avatar>
          }
          title={<H2>用餐滿意度調查_Template</H2>}
          subheader="煩請花費一點您寶貴的時間，填寫您用餐過後的意見回饋，幫助我們提供更好的用餐品質。"
        />

        <CardActions>
          <Button fullWidth variant="contained" color="primary"><P1>開始 <FontAwesomeIcon icon={faHandPointDown} fontSizeAdjust='1.2rem' /> 填答</P1></Button>
        </CardActions>

        <CardContent component={Box} display="flex" flexDirection="column" >

          <H4>您對於今日用餐的滿意程度：</H4>

          <Box display="flex" flexWrap="nowrap" flexDirection="row" >
            <LabelBox><Subtitle2>非常滿意</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>滿意</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>普通</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>不滿意</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>非常不滿意</Subtitle2></LabelBox>
          </Box>

          <H5>整體</H5>
          <RankRadioGroup
            name="整體"
            value={q1Group['整體']}
            onChange={assignQ1Group}
          />

          <H5>環境</H5>
          <RankRadioGroup
            name="環境"
            value={q1Group['環境']}
            onChange={assignQ1Group}
          />

          <H5>服務</H5>
          <RankRadioGroup
            name="服務"
            value={q1Group['服務']}
            onChange={assignQ1Group}
          />

          <H5>餐點</H5>
          <RankRadioGroup
            name="餐點"
            value={q1Group['餐點']}
            onChange={assignQ1Group}
          />

          <H5>價位</H5>
          <RankRadioGroup
            name="價位"
            value={q1Group['價位']}
            onChange={assignQ1Group}
          />
        </CardContent>

        <CardContent component={Box} display="flex" flexDirection="column" >

          <H4>您對於今天各餐點的滿意程度：</H4>

          <Box display="flex" flexWrap="nowrap" flexDirection="row" >
            <LabelBox><Subtitle2>非常滿意</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>滿意</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>普通</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>不滿意</Subtitle2></LabelBox>
            <LabelBox><Subtitle2>非常不滿意</Subtitle2></LabelBox>
          </Box>

          <H5>沙拉</H5>
          <RankRadioGroup
            name="沙拉"
            value={q2Group['沙拉']}
            onChange={assignQ2Group}
          />

          <H5>湯品</H5>
          <RankRadioGroup
            name="湯品"
            value={q2Group['湯品']}
            onChange={assignQ2Group}
          />

          <H5>主餐</H5>
          <RankRadioGroup
            name="主餐"
            value={q2Group['主餐']}
            onChange={assignQ2Group}
          />

          <H5>甜點</H5>
          <RankRadioGroup
            name="甜點"
            value={q2Group['甜點']}
            onChange={assignQ2Group}
          />

          <H5>飲品</H5>
          <RankRadioGroup
            name="飲品"
            value={q2Group['飲品']}
            onChange={assignQ2Group}
          />
        </CardContent>

        <CardContent>
          <H4>對於本店或服務人員的建議：</H4>

          <TextField
            multiline
            fullWidth
            margin='none' // dense,normal,none
            rowsMax={12}
            rows={4}
            variant="outlined"
            value={formData.suggestion || ''}
            onChange={event => assignValue({
              name: 'suggestion',
              value: event.target.value
            })}
          />
        </CardContent>

        <CardContent component={Box} textAlign='center' >
          <CardActionArea style={{ padding: '32px 24px', border: 'dotted', borderRadius: 16 }}>
            <BigIcon icon={faQuoteRight} />
            <H3 style={{ marginBottom: '16px' }}>為提供更好的服務，請讓我們更了解您一點！</H3>
            <P1>本問卷蒐集來的資訊，僅會作為內部服務改善使用。<BR xsHide />絕不外洩也不會作為其他用途用，敬請安心填寫！</P1>
          </CardActionArea>
        </CardContent>

        <CardContent>
          <H4>這是您第幾次到本站用餐？</H4>

          <RadioCtrl
            name="q4Answer"
            value={formData.q4Answer}
            onChange={assignValue}
            optionList={[
              { label: '第 1 次', value: '1' },
              { label: '2 - 3 次', value: '2-3' },
              { label: '4 - 6 次', value: '4-6' }
            ]}
          />

        </CardContent>

        <CardContent>
          <H4>你是從那裡得知本店呢？<Chip color="primary" size="small" label="複選" /></H4>

          <CheckListCtrl name="q5Answer" layout="item123"
            value={formData.q5Answer}
            onChange={assignValue}
            optionList={[
              { label: '親友介紹', value: '親友介紹' },
              { label: '宣傳傳單', value: '宣傳傳單' },
              { label: '網路資訊', value: '網路資訊' },
              { label: '經過看到', value: '經過看到' },
              { label: '其他管道', value: '其他管道' },
            ]}
          />
        </CardContent>


        <CardContent>
          <H4>請問您今天用餐的目的題？<Chip color="primary" size="small" label="複選" /></H4>

          <CheckListCtrl name="q6Answer" layout="item223"
            value={formData.q6Answer}
            onChange={assignValue}
            optionList={[
              { label: '單純用餐', value: '單純用餐' },
              { label: '朋友聚會', value: '朋友聚會' },
              { label: '家庭聚會', value: '家庭聚會' },
              { label: '情佀聚會', value: '情佀聚會' },
              { label: '生日聚會', value: '生日聚會' },
              { label: '節日聚會', value: '節日聚會' },
              { label: '商務宴請', value: '商務宴請' },
              { label: '婚禮宴請', value: '婚禮宴請' },
              { label: '尾牙春酒', value: '尾牙春酒' },
              { label: '發表會', value: '發表會' },
              { label: '記者會', value: '記者會' },
              { label: '其他目的', value: '其他目的' },
            ]}
          />
        </CardContent>

        <CardContent>
          <H4>請問您今天是幾位用餐呢？</H4>
          <P2>需大於等於 1 (可接受到小數點第 0 位)</P2>

          <TextField
            type="number"
            name="q7Answer"
            value={formData.q7Answer || ''}
            onChange={e => assignValue({ name: 'q7Answer', value: e.target.value })}
            size="medium"
            fullWidth
            placeholder="請填入數字"
            InputProps={{
              endAdornment: <InputAdornment position="end">位</InputAdornment>
            }}
            inputProps={{
              style: { textAlign: 'center', fontSize: '1.2em' },
            }}
          />

        </CardContent>

        <CardContent>
          <H4>您再次前來本店用餐的意願：</H4>
          <P2>0 到 10 分，您的意願有多高呢？</P2>

          <CustomSlider
            name="q8Answer"
            value={formData.q8Answer || 0}
            onChange={assignValue}
          />

        </CardContent>

        <CardContent>
          <Blockquote>
            <H4>個人資訊</H4>
            <P1>本問卷蒐集來的資訊，僅會作為內部服務改善使用，絕不外洩也不會作為其他用途使用，敬請放心填寫！</P1>
          </Blockquote>

          <InputFieldBox>
            <H5Base>姓名：</H5Base>
            <TextField
              type="text"
              name="name"
              value={q9Group.name || ''}
              onChange={e => assignQ9Group({ name: 'name', value: e.target.value })}
              fullWidth
              placeholder="請填入文字"
            />
          </InputFieldBox>

          <InputFieldBox>
            <H5Base>姓別：</H5Base>
            <RadioCtrl
              name="gender"
              value={q9Group.gender || ''}
              onChange={assignQ9Group}
              layout="item223"
              optionList={[
                { label: '生理男', value: 'M' },
                { label: '生理女', value: 'F' }
              ]}
            />
          </InputFieldBox>

          <InputFieldBox>
            <H5Base>生日：</H5Base>
            <TextField
              type="date"
              name="birthDate"
              value={q9Group.birthDate || ''}
              onChange={e => assignQ9Group({ name: 'birthDate', value: e.target.value })}
              fullWidth
            />
          </InputFieldBox>

          <InputFieldBox>
            <H5Base>電話：</H5Base>
            <TextField
              type="tel"
              name="phoneNo"
              value={q9Group.phoneNo || ''}
              onChange={e => assignQ9Group({ name: 'phoneNo', value: e.target.value })}
              fullWidth
              placeholder="請填入電話號碼"
            />
          </InputFieldBox>

          <InputFieldBox>
            <H5Base>信箱：</H5Base>
            <TextField
              type="email"
              name="emailAddress"
              value={q9Group.emailAddress || ''}
              onChange={e => assignQ9Group({ name: 'emailAddress', value: e.target.value })}
              fullWidth
              placeholder="請填入電子信箱 abc@goo.com"
            />
          </InputFieldBox>

        </CardContent>

        <CardActions>
          <BigButton label="感謝回答問券" onClick={() => confirm('感謝回答問券')} />
        </CardActions>

      </Card>
    </FormContainer>
  )
}

//------------------------------------------------------------
const FormContainer = withStyles(({ spacing, breakpoints }) => ({
  root: {
    maxWidth: 800,
    //borderLeft: 'solid thin',
    //borderRight: 'solid thin',
    marginBottom: '6vh',
    [breakpoints.down('xs')]: {
      paddingLeft: spacing(1),
      paddingRight: spacing(1)
    }
  }
}))(Container)
//------------------------------------------------------------
const ItemBox = withStyles(({ spacing }) => ({
  root: {
    flexBasis: '20%',
    flexGrow: 1,
    margin: spacing(0.5),
    border: 'solid thin',
    textAlign: 'center'
  }
}))(Box)
//------------------------------------------------------------
const LabelBox = withStyles(({ spacing }) => ({
  root: {
    flexBasis: '20%',
    flexGrow: 1,
    margin: spacing(0.5, 0),
    padding: spacing(0.5, 0),
    borderBottom: 'outset thin',
    textAlign: 'center',
  }
}))(Box)
const InputFieldBox = withStyles(({ spacing }) => ({
  root: {
    margin: spacing(1, 0, 4, 3)
  }
}))(Box)
//------------------------------------------------------------
const H4 = withStyles(({ spacing }) => ({
  root: {
    margin: spacing(2, 1, 1, 0)
  }
}))(H4Base)
//------------------------------------------------------------
const H5 = withStyles(({ spacing }) => ({
  root: {
    margin: spacing(1, 1, 1, 3)
  }
}))(H5Base)
//------------------------------------------------------------
const ImageCardMedia = withStyles(theme => ({
  root: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}))(CardMedia)
//------------------------------------------------------------
const RankRadioGroup = (props: {
  name: string,
  value: string,
  onChange: ValueChangeHandler
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    if (checked) {
      props.onChange({
        name: props.name,
        value: event.target.value
      })
    }
  }

  return (
    <Box display="flex" flexWrap="nowrap" flexDirection="row" >
      <ItemBox><Radio icon={<BlankIcon color="disabled" />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='非常滿意' checked={props.value == '非常滿意'} /></ItemBox>
      <ItemBox><Radio icon={<BlankIcon color="disabled" />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='滿意' checked={props.value == '滿意'} /></ItemBox>
      <ItemBox><Radio icon={<BlankIcon color="disabled" />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='普通' checked={props.value == '普通'} /></ItemBox>
      <ItemBox><Radio icon={<BlankIcon color="disabled" />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='不滿意' checked={props.value == '不滿意'} /></ItemBox>
      <ItemBox><Radio icon={<BlankIcon color="disabled" />} checkedIcon={<CheckedIcon />} onChange={handleChange} value='非常不滿意' checked={props.value == '非常不滿意'} /></ItemBox>
    </Box>
  )
}
//------------------------------------------------------------
const BigButton = withStyles(theme => ({
  root: {
    margin: '5vmin auto',
    fontSize: '10vmin',
  }
}))(ButtonEx)

//------------------------------------------------------------
const BigIcon = withStyles(({ palette }) => ({
  root: {
    color: palette.secondary.light,
    fontSize: '3em',
  }
}))((props: {
  classes: Record<string, string>,
  icon: IconDefinition
}) => {
  return (
    <span className={props.classes.root}>
      <FontAwesomeIcon icon={props.icon} />
    </span>
  )
})
