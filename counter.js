(function(window, document) {
  'use strict'

  var ACCESS_TOKEN = 'EAACEdEose0cBAPCksgZBNQYpZAQCk7Jxr5Km4KseezT2ejMmsPJayzZCJFl5liD7oYDPNYVFAFWUNHg3a7nuI2wm7ACSuM5WDNb9ZB7FTnlueZBo3aheAeNNRecxuDOaObB0o4kntgqS2pBaQGxJ5bvziFCr1KVfLzAS0PisaeQZDZD'
  var VIDEO_ID = '1640767392887284'
  var URL = 'https://graph.facebook.com/v2.8/' + VIDEO_ID + '/reactions?access_token=' + ACCESS_TOKEN

  /**
   *  Fetch counts for reaction data
   */
  var updateCounts = function(info) {

    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {

      if (xhr.readyState == XMLHttpRequest.DONE ) {

        if (xhr.status == 200) {
          var data = JSON.parse(xhr.response).data
          updateDOM(getSummary(data))

        } else {
          console.log('Status:' + xhr.status)
        }

      }
    }

    xhr.open('GET', URL, true);
    xhr.send();
  }

  /**
   * Process reaction data into summary object
   **/
  var getSummary = function(data) {
    var summary = _.countBy(data, function(obj){
      return obj.type
    })

    return summary
  }

  /**
   * Update the counts in the dom
   **/
  var updateDOM = function(counts) {
    counts = _.defaults(counts, { LIKE: 0, LOVE: 0 })

    var exoCount = counts.LIKE
    var btsCount = counts.LOVE

    var $exoCount = document.getElementById('exo-count')
    var $btsCount = document.getElementById('bts-count')

    $exoCount.textContent = exoCount.toLocaleString()
    $btsCount.textContent = btsCount.toLocaleString()
  }

  window.updateCounts = updateCounts

})(window, document)

setInterval(window.updateCounts, 1000)
