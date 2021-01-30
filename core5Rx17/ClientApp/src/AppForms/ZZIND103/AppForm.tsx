import React, { useEffect, useMemo } from 'react'
import { ButtonEx, ButtonPropsEx } from 'Widgets/ButtonEx'
import { makeStyles, Paper, Box, RootRef, TextField, Link, FormControlLabel, Switch, useTheme, useMediaQuery } from '@material-ui/core'
import { Blockquote, H1, H4, P1, Subtitle1, Subtitle2 } from 'Widgets/TypographyEx'
import { useMySwal } from 'hooks/useMySwal'
import { CheckGroupCtrl, CheckListCtrl, RadioCtrl } from './CustomRadio'
import { useStoreActions, useTypedSelector } from 'store/store'
import { withStyles } from '@material-ui/core/styles'
import scrollIntoView from 'scroll-into-view'

export default function AppForm({ formProfile }: AppFormProps) {
  const classes = useStyles();
  const theme = useTheme()
  const [f_autoNext, setAutoNextFlag] = React.useState(true) // 快答模式
  const { confirm } = useMySwal()
  const domRef = React.useRef<HTMLElement>();
  const { formData } = useTypedSelector(store => store)
  const { assignValue, assignGroupValue } = useStoreActions()

  /** helper */
  function scrollToAnchor(targetId: string) {
    if (domRef.current !== undefined) {
      const target = domRef.current.querySelector<HTMLElement>(targetId)
      if (target !== null) {
        scrollIntoView(target, {
          align: { top: 0, topOffset: 64 }
        })
      }
    }
  }

  //const f_autoNext = formData.quicklyAnswer === 'Y'
  console.log(`${formProfile.FORM_ID}.render`, formProfile)
  return (
    <RootRef rootRef={domRef}>
      <Box className={classes.root}>

        <H1>{formProfile.FORM_TITLE}</H1>
        <P1>{formProfile.FORM_DESCRIPTION}</P1>

        <Paper className={classes.scrollbox} id="Q0" >
          <Subtitle1>* 0. 快問快答?</Subtitle1>

          <FormControlLabel
            control={<Switch checked={f_autoNext} onChange={() => setAutoNextFlag(f => !f)} />}
            label="快答模式"
          />

          <P1>參考：<Link href="https://zh.surveymonkey.com/r/K7C385K" target='_blank'>網路購物使用狀況調查問卷</Link></P1>
          <P1>設計讓使用者專注於回答一個問題。</P1>

          <WellBox>
            <NextButton label="開始" onClick={() => scrollToAnchor('#Q1')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q1" >
          <Subtitle1>* 1. 請問您的性別?</Subtitle1>

          <RadioCtrl name="gender" value={formData.gender} optionList={[
            { label: '男性', value: 'M' },
            { label: '女性', value: 'F' },
            { label: '第三性', value: 'X' }
          ]} onChange={v => {
            assignValue(v)
            f_autoNext && scrollToAnchor('#Q2')
          }} />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q2')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q2">
          <Subtitle1>* 2. 請問您的年齡?</Subtitle1>

          <RadioCtrl name="ageStage" value={formData.ageStage} optionList={[
            { label: '１８歲以下', value: 'under18' },
            { label: '１８－２２歲', value: '18to22' },
            { label: '２３－２７歲', value: '23to27' },
            { label: '２８－３２歲', value: '28to32' },
            { label: '３３－３７歲', value: '33to37' },
            { label: '３８－４２歲', value: '38to42' },
            { label: '４３－４７歲', value: '43to47' },
            { label: '４７歲以上', value: 'over47' },
          ]} onChange={v => {
            assignValue(v)
            f_autoNext && scrollToAnchor('#Q3')
          }} />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q3')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q3">
          <Subtitle1>3. 請問您在網路上購物的頻率？</Subtitle1>

          <RadioCtrl name="shopFrequency" value={formData.shopFrequency} optionList={[
            { label: '每週超過３次', value: 'weekMore3' },
            { label: '每週３次以下', value: 'weekEqLess3' },
            { label: '每月３次以下', value: 'monthEqLess3' },
            { label: '每年３次以下', value: 'yearEqLess3' },
            { label: '其他', value: 'other' }
          ]} onChange={v => {
            assignValue(v)
            if (v.value !== 'other')
              f_autoNext && scrollToAnchor('#Q4')
          }} />

          <Subtitle2>其他 (請註明)</Subtitle2>

          <TextField
            multiline
            fullWidth
            margin="dense"
            rowsMax={4}
            rows={1}
            variant="outlined"
            value={formData.shopFrequencyOther || ''}
            onChange={event => assignValue({
              name: 'shopFrequencyOther',
              value: event.target.value
            })}
          />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q4')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q4">
          <Subtitle1>4. 請問您可以接受在網路購物上”單次”的消費金額上限為？</Subtitle1>

          <RadioCtrl name="consumAmountMax" value={formData.consumAmountMax} optionList={[
            { label: '１千元以下', value: 'less1K' },
            { label: '１千－３千', value: '1Kto3K' },
            { label: '３千－５千', value: '3Kto5K' },
            { label: '５千－８千', value: '5Kto8K' },
            { label: '８千－１萬', value: '8Kto10K' },
            { label: '１萬元以上', value: 'more10K' }
          ]} onChange={v=> {
            assignValue(v)
            f_autoNext && scrollToAnchor('#Q5')
          }} />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q5')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q5">
          <Subtitle1>5. 請問您會在網路上購物的種類？(可複選３項)</Subtitle1>

          <CheckListCtrl name="shopTypeChecks" layout="item223" max={3}
            value={formData.shopTypeChecks}
            onChange={assignValue}
            onMatchMax={() => f_autoNext && scrollToAnchor('#Q6')}
            optionList={[
              { label: '生活用品', value: '生活用品' },
              { label: '家俱', value: '家俱' },
              { label: '飲食', value: '飲食' },
              { label: '文具', value: '文具' },
              { label: '服飾', value: '服飾' },
              { label: '修繕服務', value: '修繕服務' },
              { label: '鞋子', value: '鞋子' },
              { label: '票卷', value: '票卷' },
              { label: '包飾', value: '包飾' },
              { label: '其他', value: 'other' }
            ]}
          />

          <Subtitle2>其他 (請註明)</Subtitle2>

          <TextField
            multiline
            fullWidth
            margin="dense"
            rowsMax={4}
            rows={1}
            variant="outlined"
            value={formData.shopTypeOther || ''}
            onChange={event => assignValue({
              name: 'shopTypeOther',
              value: event.target.value
            })}
          />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q6')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q6">
          <Subtitle1>6. 請問您網路上購物的實際使用者是？(可複選)</Subtitle1>

          <CheckGroupCtrl name="shoppingFor" checkGroup={formData.shoppingFor} optionList={[
            { label: '自己', value: 'myself' },
            { label: '家人', value: 'family' },
            { label: '朋友', value: 'friends' },
            { label: '其他', value: 'other' }
          ]} onChange={v => {
            assignGroupValue('shoppingFor', v)
          }} />

          <Subtitle2>其他 (請註明)</Subtitle2>

          <TextField
            multiline
            fullWidth
            margin="dense"
            rowsMax={4}
            rows={1}
            variant="outlined"
            value={formData.shoppingForOther || ''}
            onChange={event => assignValue({
              name: 'shoppingForOther',
              value: event.target.value
            })}
          />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q7')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q7">
          <Subtitle1>7. 請問您網路購物可以接受的付款方式？(可複選)</Subtitle1>

          <CheckGroupCtrl name="payMethodGroup" checkGroup={formData.payMethodGroup} optionList={[
            { label: '超商取貨付款', value: '超商取貨付款' },
            { label: '信用卡', value: '信用卡' },
            { label: '寄到付款', value: '寄到付款' },
            { label: '行動支付', value: '行動支付' },
            { label: 'ATM轉帳', value: 'ATM轉帳' },
            { label: '其他', value: 'other' }
          ]} onChange={v => {
            assignGroupValue('payMethodGroup', v)
          }} />

          <Subtitle2>其他 (請註明)</Subtitle2>

          <TextField
            multiline
            fullWidth
            margin="dense"
            rowsMax={4}
            rows={1}
            variant="outlined"
            value={formData.payMethodOther || ''}
            onChange={event => assignValue({
              name: 'payMethodOther',
              value: event.target.value
            })}
          />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q8')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q8">
          <Subtitle1>8. 請問您網路上購物前是否會先比價？</Subtitle1>

          <RadioCtrl name="rateParity" value={formData.rateParity} optionList={[
            { label: '是', value: 'Y' },
            { label: '否', value: 'N' }
          ]} onChange={v => {
            assignValue(v)
            if (v.value === 'N')
              f_autoNext && scrollToAnchor('#Q10')
            else
              f_autoNext && scrollToAnchor('#Q9')
          }} />

          <WellBox>
            <NextButton label="Next" onClick={() => {
              if (formData.rateParity === 'N')
                scrollToAnchor('#Q10')
              else
                scrollToAnchor('#Q9')
            }} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q9">
          <Subtitle1>9. 呈上題，您的比價方式為何？(可複選)</Subtitle1>

          <CheckGroupCtrl name="rateParityRuleGroup" checkGroup={formData.rateParityRuleGroup} optionList={[
            { label: '類似商品的價格', value: '類似商品的價格' },
            { label: '名人或朋友推薦(如網紅/部落客)', value: '名人或朋友推薦(如網紅/部落客)' },
            { label: '售後服務(如退換/保固)', value: '售後服務(如退換/保固)' },
            { label: '品牌的形象評價', value: '品牌的形象評價' },
            { label: '其他', value: '其他' },
            { label: '其他 (請註明)', value: 'other' }
          ]} onChange={v => {
            assignGroupValue('rateParityRuleGroup', v)
          }} />

          <Subtitle2>其他 (請註明)</Subtitle2>

          <TextField
            multiline
            fullWidth
            margin="dense"
            rowsMax={4}
            rows={1}
            variant="outlined"
            value={formData.rateParityRuleOther || ''}
            onChange={event => assignValue({
              name: 'rateParityRuleOther',
              value: event.target.value
            })}
          />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q10')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q10">
          <Subtitle1>10. 請問您會使用Illustrator、Photoshop 等類似美工編輯軟體嗎？</Subtitle1>

          <RadioCtrl name="isArtist" value={formData.isArtist} optionList={[
            { label: '是', value: 'Y' },
            { label: '否', value: 'N' }
          ]} onChange={v => {
            assignValue(v)
            f_autoNext && scrollToAnchor('#Q11')
          }} />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q11')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q11">
          <pre>A block 11 </pre>

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#Q21')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="Q21">
          <Subtitle1>21. 請問您希望網路購物提供什麼優惠?</Subtitle1>

          <TextField
            multiline
            fullWidth
            margin="dense"
            rowsMax={12}
            rows={4}
            variant="outlined"
            value={formData.suggestion || ''}
            onChange={event => assignValue({
              name: 'suggestion',
              value: event.target.value
            })}
          />

          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#QY')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="QY">
          <Blockquote>感謝您填寫本問卷，以下依據《個人資料保護法》(暨施行細則)，向您告知本問卷蒐集、處理及利用個人資料之事項：上述個人資料之蒐集、處理及利用，將僅限本問卷業務需要使用，我們會依個資法之規定妥善保護您的個人資訊。</Blockquote>
          <WellBox>
            <NextButton label="Next" onClick={() => scrollToAnchor('#QZ')} />
          </WellBox>
        </Paper>

        <Paper className={classes.scrollbox} id="QZ" style={{ textAlign: 'center' }}>
          <BigButton label="感謝回答問券" onClick={() => confirm('感謝回答問券')} />
        </Paper>

      </Box>
    </RootRef >
  );
}

const useStyles = makeStyles(({ spacing, mixins }) => ({
  root: {
    marginTop: '3vmin',
    marginBottom: '3vmin'
  },
  scrollbox: {
    minHeight: '80vh',
    padding: spacing(2),
    margin: '5vh',
  },
}))

//------------------------------------------------------------
const BigButton = withStyles(theme => ({
  root: {
    marginTop: '25vh',
    marginBottom: '25vh',
    fontSize: '10vh',
    lineHeight: '1.4em'
  }
}))(ButtonEx)

//------------------------------------------------------------
const WellBox = withStyles(({ spacing }) => ({
  root: {
    margin: spacing(3),
    padding: spacing(1)
  }
}))(Box)

//------------------------------------------------------------

const NextButton: React.FC<ButtonPropsEx> = (props) => {
  const { breakpoints } = useTheme()
  const matchXs = useMediaQuery(breakpoints.down('xs'))
  return (
    <ButtonEx size='large' {...props} fullWidth={matchXs} />
  )
}

