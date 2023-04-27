import React from 'react'
import VK from 'https://vk.com/js/api/openapi.js?169';

function ProfilePage() {
  return (
    <div>

        {VK.Widgets.AllowMessagesFromCommunity("vk_allow_messages_from_community", {}, 220122071)}

    </div>
  )
}

export default ProfilePage