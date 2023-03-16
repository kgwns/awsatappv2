//
//  StoriesInterfaceController.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 17/10/22.
//

import Foundation
import WatchKit
import UIKit

class StoriesInterfaceController: WKInterfaceController {
  @IBOutlet private weak var story_title: WKInterfaceLabel!
  @IBOutlet private weak var story_image: WKInterfaceImage!

  override func awake(withContext context: Any?) {
    guard let story: Story = context as? Story else { return }
    
    story_title.setText(story.title)
    setImage(from: story.photo)
  }
  
  private func setImage(from urlString: String) {
      story_image.setImage(UIImage(named: "placeholder_image")!)
      guard !urlString.isEmpty, let imageURL = URL(string: urlString) else { return }
      URLSession.shared.dataTask(with: imageURL) {  data, response, error in
          guard let data = data, error == nil else { return }
          guard let image = UIImage(data: data) else { return }
          DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            self.story_image.setImage(image)
          }
      }.resume()
  }
}
