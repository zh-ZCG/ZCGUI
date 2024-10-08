import z from '../libs/z'

type navType = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'

/**
 * 判断是否有跳转操作正在执行
 */
let isNavigating = false

/**
 * 返回上一页
 * @param indexUrl 首页地址
 * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 */
export function zNavBack(indexUrl?: string, delta = 1) {
  /**
   * 有操作直接返回
   */
  if (isNavigating) return
  isNavigating = true

  const indexPageUrl = z.isEmptyVariableInDefault(
    indexUrl,
    '/pages/index/index'
  )
  // 通过判断当前页面的页面栈信息，是否有上一页进行返回，如果没有则跳转到首页
  const pages = getCurrentPages()
  if (pages?.length) {
    const firstPage = pages[0]
    if (
      pages.length === 1 &&
      (!firstPage.route || firstPage?.route != indexPageUrl)
    ) {
      return zNavPage(indexPageUrl, 'reLaunch')
    } else {
      uni.navigateBack({
        delta,
        complete: () => {
          isNavigating = false
        },
      })
      return Promise.resolve()
    }
  } else {
    return zNavPage(indexPageUrl, 'reLaunch')
  }
}

/**
 * 跳转到指定页面
 * @param url 页面地址
 * @param type 跳转类型
 */
export function zNavPage(url: string, type: navType = 'navigateTo') {
  /**
   * 有操作直接返回
   */
  if (isNavigating) return
  isNavigating = true

  function handelNavFail(err: any) {
    z.error(`zNavPage 跳转页面失败: ${err}`)
  }
  return new Promise<void>((resolve, reject) => {
    switch (type) {
      case 'navigateTo':
        uni.navigateTo({
          url,
          success: () => {
            resolve()
          },
          fail: (err) => {
            handelNavFail(err)
            reject(err)
          },
          complete: () => {
            isNavigating = false
          },
        })
        break
      case 'redirectTo':
        uni.redirectTo({
          url,
          success: () => {
            resolve()
          },
          fail: (err) => {
            handelNavFail(err)
            reject(err)
          },
          complete: () => {
            isNavigating = false
          },
        })
        break
      case 'reLaunch':
        uni.reLaunch({
          url,
          success: () => {
            resolve()
          },
          fail: (err) => {
            handelNavFail(err)
            reject(err)
          },
          complete: () => {
            isNavigating = false
          },
        })
        break
      case 'switchTab':
        uni.switchTab({
          url,
          success: () => {
            resolve()
          },
          fail: (err) => {
            handelNavFail(err)
            reject(err)
          },
          complete: () => {
            isNavigating = false
          },
        })
    }
  })
}
