import Route from '@/types/Route'
import { useI18n } from 'vue-i18n'

export default class RouteHelper {
  private static instance: RouteHelper
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static translator: any

  public static getInstance(): RouteHelper {
    if (!RouteHelper.instance) {
      RouteHelper.instance = new RouteHelper()
      const { t } = useI18n()
      this.translator = t
    }

    return RouteHelper.instance
  }

  public sampleCount = (r: Route | undefined): number => {
    if (r && r.orders) {
      return r.orders.reduce((acc, wp) => {
        return acc + wp.samples.length
      }, 0)
    } else {
      return 0
    }
  }

  public routeFooter = (r: Route | undefined): string => {
    const { t } = useI18n()

    const orders = r ? r.orders.length : 0

    const sCount = this.sampleCount(r)
    const samplesText = sCount > 1 || sCount == 0 ? t('samples') : t('sample')
    const ordersText = orders > 1 || orders == 0 ? t('orders') : t('order')
    return `${sCount} ${samplesText} ${t(
      'distributed on',
    )} ${orders} ${ordersText}`
  }
}
